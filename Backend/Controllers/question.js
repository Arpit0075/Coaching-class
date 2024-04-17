const excelToJson = require("convert-excel-to-json");
var multer = require("multer");
const fs = require("fs");
const ClassDetail = require("../Models/ClassDetail");
const Question = require("../Models/Question");
const Answer = require("../Models/Answers");

exports.upload = async (req, res) => {
  try {
    let fileName;
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads"); //destination folder for file
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    var upload = multer({ storage: storage }).single("file");

    // uploading file to uploads folder
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      console.log("file received!");

      // updating database for marksheetupload, call the function to update the db
      let duration = "30 minutes"; //can modify time
      let instructions = "Attempt all questrions";
      let subject = req.body.subject;
      let term = req.body.term;
      let sheetName = req.body.sheetName; // sheetname of excel sheet that need to be referred

      fileName = req.file.filename;

      // create function to update model online test
      let arr = getQuestionPaper();

      if (!arr.length) {
        return res.send({
          message: "Enter the correct Sheet Name",
          status: 200,
        });
      }
      await insertOnlineTests(arr);

      // deleting file from local
      let path = `uploads/${fileName}`;
      deleteFile(path);

      //helper functions
      //deleting the file from local
      function deleteFile(path) {
        fs.unlinkSync(path);
      }
      function getQuestionPaper(
        fileLocation = `uploads/${fileName}`,
        sheetNo = sheetName
        //sheetNo = "Online test"
      ) {
        const excelData = excelToJson({
          sourceFile: fileLocation,

          sheets: [
            {
              // Excel Sheet Name
              name: sheetNo,

              // Header Row -> be skipped and will not be present at our result object.
              header: {
                rows: 1,
              },

              // Mapping columns to keys
              columnToKey: {
                A: "Section",
                B: "QuestionNumber",
                C: "Description",
                D: "Marks",
                E: "QuestionType",
                F: "Options",
                G: "CorrectAnswer",
                H: "Topic",
              },
            },
          ],
        });

        let arr = excelData[sheetNo];
        let res = [];

        // trimming options
        for (let el of arr) {
          let options;
          if (el.Options) {
            options = el.Options.split(",")
              .map((e) => {
                return e.trim();
              })
              .join(",");
          }
          res.push({
            section: el.Section,
            questionNumber: el.QuestionNumber,
            description: el.Description,
            marks: el.Marks,
            questionType: el.QuestionType,
            correctAnswer: el.CorrectAnswer || null,
            options: options || null,
            topic: el.Topic,
          });
        }
        return res;
      }

      async function insertOnlineTests(questionPapers) {
        let test = await Question.findOne({
          subject: subject,
          term: term,
        });

        if (!test) {
          let topics = [];

          //calc total marks
          let total = 0;
          for (let el of questionPapers) {
            total += +el.marks;

            if (!topics.includes(el.topic)) {
              topics.push(el.topic);
            }
          }

          let result = {
            subject: subject,
            term: term,
            duration: duration,
            instructions: instructions,
            totalMarks: total,
            questionPaper: questionPapers,
            topics,
          };
          //insert online test
          await Question.insertMany(result);
          //update class model -- online test working
          await ClassDetail.updateOne(
            {
              termsUploaded: {
                $elemMatch: {
                  term: term,
                  subject: subject,
                },
              },
            },
            { $set: { "termsUploaded.$.uploaded": true } }
          );
          res.send({ message: "Upload Successfull", status: 200 });
        } else {
          return res.send({
            message:
              "Online test for this class,term,subject is already uploaded",
            status: 200,
          });
        }
      }
    });
  } catch (e) {
    res.send({ errors: e });
  }
};

exports.getQuestionPapers = async (req, res) => {
  let userType = req.body.user;

  if (userType?.user?.type === "ADMIN") {
    try {
      let questions = await Question.find();
      res.send(questions);
    } catch (e) {
      res.send({ error: e });
    }
  } else {
    //for students , NOTE: find if test is already taken or not then modify the questions array
    try {
      let questions = await Question.find();
      let result = [];
      for (let q of questions) {
        let answers = await Answer.findOne({
          questionPaperId: q._id,
          studentID: req.body.user.user._id,
        });

        if (!answers) {
          result.push(q);
        } else {
          result.push({
            subject: q.subject,
            term: q.term,
            taken: true,
            duration: q.duration,
          });
        }
      }
      res.send(result);
    } catch (e) {
      res.send({ error: e });
    }
  }
};

exports.getQuestionPaper = async (req, res) => {
  let userType = req.body.user;
  let questionPaperId = req.params.questionPaperId;

  try {
    let questions = await Question.findOne({ _id: questionPaperId });
    res.send(questions);
  } catch (e) {
    res.send({ error: e });
  }
};

exports.submitAnswerPaper = async (req, res) => {
  let userType = req.body.user;
  let questionPaperId = req.params.questionPaperId;

  try {
    let answerSheet = await Answer.findOne({
      questionPaperId: questionPaperId,
      studentID: req.body.user.user._id,
    });

    if (!answerSheet) {
      let questionPaper = await Question.findOne({ _id: questionPaperId });

      let response = await Answer.create({
        questionPaperId: questionPaperId,
        subject: questionPaper.subject,
        term: questionPaper.term,
        totalMarks: questionPaper.totalMarks,
        studentName: req.body.user.user.name,
        studentID: req.body.user.user._id,
        timeTaken: req.body.timeTaken,
        marksheet: req.body.answers,
        checkedBy: null,
        totalMarksObtained: null,
        comment: "",
      });
    }
  } catch (e) {
    res.send({ error: e });
  }
};

exports.getEvaluatePapersList = async (req, res) => {
  try {
    let papers = await Answer.find();
    res.send(papers);
  } catch (e) {
    res.send({ error: e });
  }
};

exports.getEvaluatePaper = async (req, res) => {
  let answerSheetId = req.params.answerSheetId;

  try {
    let answerSheet = await Answer.findOne({
      _id: answerSheetId,
    });

    // getting the question paper
    let questionPaper = await Question.findOne({
      _id: answerSheet.questionPaperId,
    });

    let questionObject = answerSheet;
    let questions = questionPaper.questionPaper;
    let answers = answerSheet.marksheet;

    let arr = [];
    let totalMarksObtained = 0; //marks obtained for non descriptive question
    let totalNumberQuestionEvaluate = 0; // total number of question to be evaluated by teacher
    answers.forEach((el) => {
      let curr = questions.find((q) => {
        return q.questionNumber === el.questionNumber;
      });
      if (curr.options) {
        if (el.answer === curr.correctAnswer) totalMarksObtained += curr.marks;
        arr.push({ ...curr, studentAnswer: el.answer });
      } else {
        arr.push({ ...curr, studentAnswer: el.answer });
        totalNumberQuestionEvaluate++;
      }
    });

    let sections = [];
    arr.map((el) => {
      if (!sections.includes(el.section)) {
        sections.push(el.section);
      }
    });

    let result1 = [];
    sections.forEach((s) => {
      let questions = [];
      arr.forEach((el) => {
        if (el.section === s) {
          questions.push(el);
        }
      });
      result1.push({ section: s, questions: questions });
    });

    let result = {
      marksheet: result1,
      optionalMarksObtained: totalMarksObtained,
      questionObject: questionObject,
      totalNumberQuestionEvaluate: totalNumberQuestionEvaluate,
    };

    res.send({ result });
  } catch (e) {
    res.send({ error: e });
  }
};

exports.postEvaluatePaper = async (req, res) => {
  try {
    let answerSheetId = req.params.answerSheetId;

    let answerSheet = await Answer.findOne({
      _id: answerSheetId,
    });

    let user = req.body.user.user;

    let checkedBy = user.name;
    let checkedObj = req.body.checked;
    let answers = req.body.totalQuestions.marksheet;
    let overAllComment = req.body.overAllComment;

    let questionPaperId = req.body.totalQuestions.questionPaperId;

    let questions = await Question.findOne({
      _id: questionPaperId,
    });
    let questionPaper = questions.questionPaper;

    let result = [];
    let totalMarks = 0;
    let subjectMarks = [];

    answers.forEach((a) => {
      let curr = questionPaper.find((q) => {
        return a.questionNumber === q.questionNumber;
      });
      if (curr.options) {
        let currArr = checkedObj.find((el) => {
          return el.questionNumber === a.questionNumber;
        });

        let marksAllocated = 0;
        if (curr.correctAnswer === a.answer) {
          totalMarks += curr.marks;
          marksAllocated = curr.marks;
        }
        let comment = "";
        if (currArr && currArr.comment) {
          comment = currArr.comment;
        }

        result.push({
          ...curr,
          studentAnswer: a.answer,
          marksAllocated: marksAllocated,
          comment: comment,
        });

        subjectMarks.push({
          branch: curr.topic,
          totalMarks: curr.marks,
          marksObtained: marksAllocated,
        });
      } else {
        let currArr = checkedObj.find((el) => {
          return el.questionNumber === a.questionNumber;
        });
        let comment = "";
        if (currArr && currArr.comment) {
          comment = currArr.comment;
        }

        totalMarks += currArr.marksAllocated;

        result.push({
          ...curr,
          marksAllocated: currArr.marksAllocated,
          comment: comment,
          studentAnswer: a.answer,
        });

        subjectMarks.push({
          branch: curr.topic,
          totalMarks: curr.marks,
          marksObtained: currArr.marksAllocated,
        });
      }
    });

    let subjectMarksArr = [];
    let branches = [];
    for (let el of subjectMarks) {
      if (!branches.includes(el.branch)) {
        branches.push(el.branch);
      }
    }

    branches.forEach((b) => {
      let branch = b;
      let totalMarks = 0;
      let marksObtained = 0;
      subjectMarks.forEach((el) => {
        if (el.branch === b) {
          totalMarks += el.totalMarks;
          marksObtained += el.marksObtained;
        }
      });
      subjectMarksArr.push({
        branch: branch,
        totalMarks: totalMarks,
        marksObtained: marksObtained,
      });
    });

    answerSheet.marksheet = result;
    answerSheet.subjectMarks = subjectMarksArr;
    answerSheet.totalMarksObtained = totalMarks;
    answerSheet.checkedBy = checkedBy;
    answerSheet.comment = overAllComment;
    await answerSheet.save();
  } catch (e) {
    res.send({ error: e });
  }
};

exports.getMarksheets = async (req, res) => {
  try {
    let papers = await Answer.find();
    res.json(papers);
  } catch (e) {
    res.send({ error: e });
  }
};

exports.getMarksheetsStudent = async (req, res) => {
  let studentID = req.params.studentId;
  try {
    let papers = await Answer.find({ studentID });
    res.send(papers);
  } catch (e) {
    res.send({ error: e });
  }
};

exports.getEvaluateDPaper = async (req, res) => {
  let answerSheetId = req.params.answerSheetId;
  try {
    let answerSheet = await Answer.findOne({
      _id: answerSheetId,
    });

    let arr = answerSheet.marksheet;
    //creating array for section wise
    let sections = [];
    arr.map((el) => {
      if (!sections.includes(el.section)) {
        sections.push(el.section);
      }
    });

    let result = [];
    sections.forEach((s) => {
      let questions = [];
      arr.forEach((el) => {
        if (el.section === s) {
          questions.push(el);
        }
      });
      result.push({ section: s, questions: questions });
    });

    //creating array for topic wise
    let topics = [];
    arr.map((el) => {
      if (!topics.includes(el.topic)) {
        topics.push(el.topic);
      }
    });

    let result1 = [];
    topics.forEach((t) => {
      let questions = [];
      arr.forEach((el) => {
        if (el.topic === t) {
          questions.push(el);
        }
      });
      result1.push({ topic: t, questions: questions });
    });

    return res.send({
      evaluatedPaper: result,
      topicWiseEvaluatedPaper: result1,
      answerSheetObj: answerSheet,
    });
  } catch (e) {
    res.send({ error: e });
  }
};
