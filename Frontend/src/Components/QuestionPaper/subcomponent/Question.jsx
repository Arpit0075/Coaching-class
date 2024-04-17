import React, { useEffect, useState } from "react";
import Countdown from "./Countdown.jsx";
import { Typography, Button, Snackbar } from "@mui/material";
import Summary from "./Summary.jsx";
import Navigate from "./Navigate.jsx";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import DescriptiveQuestions from "./DescriptiveQuestions.jsx";
import DrawingQuestions from "./DrawingQuestions.jsx";
import GraphQuestions from "./GraphQuestions.jsx";
import { useSubmitAnswerPaper } from "../hooks/useSubmitAnswerPaper.jsx";

const classes = {
  listStyle: {
    listStyleType: "decimal",
    marginLeft: "1rem",
    marginTop: "0.5rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  selectedListStyle: {
    listStyleType: "decimal",
    marginLeft: "1rem",
    borderRadius: "0.2rem",
    marginTop: "0.5rem",
    width: "fit-content",
    cursor: "pointer",
    padding: "0.5rem",
    background: "rgba(128, 128, 128, 0.4)",
    color: "#EDEADE",
  },
  questionContainer: {
    padding: "0.5rem",
    marginTop: "0.5rem",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
    color: "#EDEADE",
    minHeight: "250px",
  },
  questionsBtnContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem",
  },
  questionDescriptionContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
    width: "100%",
  },
  question: {
    fontSize: "1rem",
    color: "#EDEADE",
  },
  questionSection: {
    fontSize: "1rem",
    color: "#EDEADE",
    fontWeight: "650",
  },
  boxQuestion: {
    fontSize: "1rem",
    fontWeight: "400",
    color: "#EDEADE",
  },
  boxContainer: {
    width: "10%",
  },
  questionsBtnCon: {
    display: "flex",
    gap: "1rem",
  },
  questionBtn: {
    fontSize: "0.8rem",
    color: "#EDEADE",
  },
};

const Question = ({
  questions,
  questionNumber,
  setQuestionNumber,
  duration,
  paperId,
  examTimeStart,
  totalMarks,
}) => {
  let { submitPaper } = useSubmitAnswerPaper();

  const [currentQuestionArr, setCurrentQuestionArr] = useState(null);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrevious, setDisablePrevious] = useState(false);
  const [answerArr, setAnswerArr] = useState([]);
  const [descriptiveAnswer, setDescriptiveAnswer] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [open, setOpen] = useState(false);
  const [totalDuration, setTotalDuration] = useState(null);
  const [stopTimer, setStopTimer] = useState(false);

  useEffect(() => {
    setTotalDuration(+duration.split(" ")[0]);
  }, []);

  useEffect(() => {
    setCurrentQuestionArr(currentQuestion(questions));

    if (questionNumber == 1) {
      setDisablePrevious(true);
    } else {
      setDisablePrevious(false);
    }

    if (questionNumber === questions.length) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }
  }, [questionNumber]);

  function currentQuestion(arr) {
    let currArr = arr.find((el) => {
      return el.questionNumber === questionNumber;
    });
    return currArr;
  }

  const findDefaultAnswers = (answers, currQuestion) => {
    let elm = answers.find((el) => {
      return el.questionNumber === currQuestion.questionNumber;
    });
    if (elm) {
      return elm.answer;
    }
  };

  // pushing optional type answers into answers arr
  const setAnswers = (obj) => {
    setOptionValue(obj.answer);
    let arr = [...answerArr];
    let curr = arr.find((el) => el.questionNumber == obj.questionNumber);

    if (answerArr.length === 0 || !curr) {
      setAnswerArr((prev) => [...prev, obj]);
    } else {
      let newState = answerArr.map((el) => {
        if (el.questionNumber == obj.questionNumber) {
          return { ...el, answer: obj.answer };
        }
        return el;
      });
      setAnswerArr(newState);
    }
  };

  const handleNext = () => {
    setDescriptiveAnswer("");
    if (questionNumber <= questions.length) {
      setQuestionNumber(questionNumber + 1);
    }
  };

  const handlePrevious = () => {
    setDescriptiveAnswer("");
    if (questionNumber <= questions.length) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  //function to get selected option in radio button
  const optionSelectedValue = (questionNumber, option) => {
    let question = answerArr.find((el) => {
      return el.questionNumber === questionNumber;
    });

    if (question && question.answer === option) {
      return true;
    } else return false;
  };

  //summary
  const [openSummary, setOpenSummary] = React.useState(false);

  // const handleCloseSummary = () => {
  //   setOpenSummary(false);
  // };

  // handling submission of answers
  const handleSubmit = () => {
    // calculating time taken
    let date = Date.now();
    let timediff = date - examTimeStart;
    let minutes = Math.floor(timediff / 60000);
    let seconds = ((timediff % 60000) / 1000).toFixed(0);
    let sec = (seconds < 10 ? "0" : "") + seconds;

    const final_sec = sec;
    const final_min = minutes;

    //stopping timer
    setStopTimer(true);

    //send req for submission
    submitPaper({
      paperId: paperId,
      answers: answerArr,
      timeTaken: `${final_min}:${final_sec}`,
    });
    setOpenSummary(true);
  };

  return (
    <div
      style={{
        flexGrow: 1,
        padding: "0.5rem",
        margin: "0.5rem",
        boxShadow:
          "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
        color: "#EDEADE",
        paddingBottom: "2rem",
      }}
    >
      {!stopTimer && (
        <Countdown
          min={+duration.split(" ")[0]}
          sec={0}
          examTimeStart={examTimeStart}
          totalDuration={totalDuration}
          setTotalDuration={setTotalDuration}
          setOpen={setOpen}
          open={open}
          isTimerCompleted={(comp) => {
            if (comp) {
              handleSubmit();
            }
          }}
        />
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message="Less than 10 minutes remaining"
      />
      {currentQuestionArr && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              mariginBottom: "0.5rem",
            }}
          >
            <Typography variant="h6" style={classes.questionSection}>
              Section: <span>{currentQuestionArr.section}</span>
            </Typography>
          </div>
          <div style={classes.questionContainer}>
            <div style={classes.questionDescriptionContainer}>
              <div style={{ width: "80%" }}>
                <Typography variant="h6" style={classes.boxQuestion}>
                  {currentQuestionArr.questionNumber}
                  {"."} <span>{currentQuestionArr.description}</span>
                </Typography>
              </div>
              <div style={classes.boxContainer}>
                <Typography variant="h6" style={classes.boxQuestion}>
                  Marks: <span>{currentQuestionArr.marks}</span>
                </Typography>
              </div>
            </div>
            {currentQuestionArr.options &&
              currentQuestionArr.questionType !== "Graph" && (
                <FormControl component="fieldset">
                  <RadioGroup
                    style={classes.question}
                    aria-label="gender"
                    name="gender1"
                    onChange={(e) =>
                      setAnswers({
                        answer: e.target.value,
                        questionNumber: currentQuestionArr.questionNumber,
                        question: currentQuestionArr.description,
                      })
                    }
                  >
                    {currentQuestionArr.options.split(",").map((option, i) => {
                      return (
                        <FormControlLabel
                          style={classes.question}
                          control={<Radio sx={{ color: "white" }} />}
                          key={i}
                          value={option}
                          label={option}
                          checked={optionSelectedValue(
                            currentQuestionArr.questionNumber,
                            option
                          )}
                        >
                          {option}
                        </FormControlLabel>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              )}
            {!currentQuestionArr.options &&
              currentQuestionArr.questionType !== "Drawing" &&
              currentQuestionArr.questionType !== "Graph" && (
                <>
                  <DescriptiveQuestions
                    answerArr={answerArr}
                    setAnswerArr={setAnswerArr}
                    descriptiveAnswer={descriptiveAnswer}
                    setDescriptiveAnswer={setDescriptiveAnswer}
                    questionNumber={currentQuestionArr.questionNumber}
                    question={currentQuestionArr.description}
                    currentQuestionArr={currentQuestionArr}
                    findDefaultAnswers={findDefaultAnswers}
                  />
                </>
              )}
            {!currentQuestionArr.options &&
              currentQuestionArr.questionType === "Drawing" && (
                <>
                  <DrawingQuestions
                    answerArr={answerArr}
                    setAnswerArr={setAnswerArr}
                    descriptiveAnswer={descriptiveAnswer}
                    setDescriptiveAnswer={setDescriptiveAnswer}
                    questionNumber={currentQuestionArr.questionNumber}
                    question={currentQuestionArr.description}
                    currentQuestionArr={currentQuestionArr}
                    findDefaultAnswers={findDefaultAnswers}
                  />
                </>
              )}

            {!currentQuestionArr.options &&
              currentQuestionArr.questionType === "Graph" && (
                <>
                  <GraphQuestions
                    answerArr={answerArr}
                    setAnswerArr={setAnswerArr}
                    descriptiveAnswer={descriptiveAnswer}
                    setDescriptiveAnswer={setDescriptiveAnswer}
                    questionNumber={currentQuestionArr.questionNumber}
                    question={currentQuestionArr.description}
                    currentQuestionArr={currentQuestionArr}
                    findDefaultAnswers={findDefaultAnswers}
                    optionSelectedValue={optionSelectedValue}
                    setAnswers={setAnswers}
                  />
                </>
              )}
          </div>
        </>
      )}
      <div style={classes.questionsBtnContainer}>
        <div style={classes.questionsBtnCon}>
          <Button
            style={classes.questionBtn}
            variant="contained"
            color="primary"
            onClick={handlePrevious}
            disabled={disablePrevious}
          >
            Previous
          </Button>
          <Button
            style={classes.questionBtn}
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={disableNext}
          >
            Next
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={classes.questionBtn}
            onClick={handleSubmit}
          >
            Submit Test
          </Button>
        </div>
      </div>
      <Summary
        openSummary={openSummary}
        setOpenSummary={setOpenSummary}
        answerArr={answerArr}
        examTimeStart={examTimeStart}
        totalQuestions={questions.length}
        totalMarks={totalMarks}
      />
      <Navigate
        answerArr={answerArr}
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
        questions={questions}
        setDescriptiveAnswer={setDescriptiveAnswer}
      />
    </div>
  );
};

export default Question;
