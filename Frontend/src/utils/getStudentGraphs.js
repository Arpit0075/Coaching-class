export const getStudentGraphs = (marksheets) => {
  // creating student subject dataset
  let terms = [];
  let subjects = [];
  // getting terms
  marksheets.map((el) => {
    terms.push(el.term);
  });
  terms = [...new Set(terms)];

  // getting subjects
  marksheets.map((el) => {
    subjects.push(el.subject);
  });
  subjects = [...new Set(subjects)];

  let resultB = [];
  for (let t of terms) {
    let marksObtainedB = [];

    let bgClr = [];

    let subjectArr = [];
    for (let s of subjects) {
      for (let el of marksheets) {
        if (el.term === t && el.subject === s) {
          subjectArr.push(s);
          marksObtainedB.push(el.totalMarksObtained);
          let totalMarksObtained = el.totalMarksObtained;
          let totalMarks = el.totalMarks;
          let percentage = (totalMarksObtained / totalMarks) * 100;

          // colors
          if (percentage >= 80) {
            bgClr.push("#92BA92"); // green color if above avg
          } else if (percentage > 65) {
            bgClr.push("#54BAB9"); // blue color in avg
          } else {
            bgClr.push("#FD8A8A"); // red color if  below
          }
        }
      }
    }

    let arrayB = {
      labels: subjectArr,
      datasets: [
        {
          //axis: 'y',
          label: "Marks Obtained",
          data: marksObtainedB,
          backgroundColor: bgClr,
          //backgroundColor: ['lightblue'], // we can give bar colors here
        },
      ],
      termType: t,
    };
    resultB.push(arrayB);
  }

  // studentTopicData
  let resultTable = [];
  for (let s of subjects) {
    for (let t of terms) {
      let data = [];
      let tArr = [];
      for (let el of marksheets) {
        if (el.term === t && el.subject === s) {
          for (let topics of el.subjectMarks) {
            let marksObtained = topics.marksObtained;
            let totals = topics.totalMarks;
            let percentage = (marksObtained / totals) * 100;

            tArr.push({
              percentage: percentage,
              topic: topics.branch,
              Marks: topics.marksObtained,
            });
          }
          break;
        }
      }

      if (tArr.length > 0) {
        data.push(...tArr);
        resultTable.push({ data: data, subject: s, termType: t });
      }
    }
  }

  return { studentSubjectData: resultB, studentTopicTables: resultTable };
};
