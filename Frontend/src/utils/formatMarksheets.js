export const formatMarksheets = (arr1) => {
  let terms5 = [];
  arr1.map((el) => {
    if (!terms5.includes(el.term)) {
      terms5.push(el.term);
    }
  });

  // getting subjects
  let subjects5 = [];
  arr1.map((el) => {
    subjects5.push(el.subject);
  });
  subjects5 = [...new Set(subjects5)];

  // getting students
  let students5 = [];
  let studentIds = [];
  arr1.map((el) => {
    if (!studentIds.includes(el.studentID)) {
      students5.push(el);
    }
    studentIds.push(el.studentID);
  });

  let result5 = [];
  let students6 = [];
  for (let st of students5) {
    let terms1 = [];
    let terms2 = [];
    for (let t of terms5) {
      let subjects6 = [];
      for (let sub of subjects5) {
        for (let el of arr1) {
          if (
            el.term === t &&
            el.studentID === st.studentID &&
            el.subject === sub
          ) {
            subjects6.push({
              subject: el.subject,
              totalMarksObtained: el.totalMarksObtained,
              totalMarks: el.totalMarks,
              subjectMarks: el.subjectMarks,
              marksheetId: el._id,
            });
          }
        }
        if (!terms2.includes(t)) {
          terms1.push({ termType: t, subjects: subjects6 });
        }
        terms2.push(t);
      }
    }

    if (!students6.includes(st.studentID)) {
      result5.push({
        studentName: st.studentName,
        terms: terms1,
        studentId: st.studentID,
      });
    }
    students6.push(st.studentID);
  }
  return result5;
};
