import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

//current answered skip paper
const classes = {
  root: {
    marginTop: "1rem",
  },
  paper: {
    fontSize: "1.1rem",
    padding: "0.2rem",
    textAlign: "center",
    color: "green",
    cursor: "pointer",
  },
  answered: {
    padding: "0.2rem",
    textAlign: "center",
    background: "#808080",
    cursor: "pointer",
  },
  skip: {
    background: "#f1948a",
    padding: "0.2rem",
    textAlign: "center",
    cursor: "pointer",
  },
  current: {
    background: "#abebc6",
    padding: "0.2rem",
    textAlign: "center",
    cursor: "pointer",
  },
  overViewLegand: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    display: "flex",
    alignItems: "center",
    borderRadius: "0.3rem",
    gap: "1rem",
    flexWrap: "wrap",
  },
  overViewLegandSub: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
};

function Navigate({
  questions,
  questionNumber,
  setQuestionNumber,
  answerArr,
  setDescriptiveAnswer,
}) {
  let visited = new Set([1]);
  const handleClick = (q) => {
    setDescriptiveAnswer("");

    setQuestionNumber(q.questionNumber);
    visited.add(q.questionNumber);
  };

  function findPage(currQuestionNumber, q) {
    let includes =
      answerArr &&
      answerArr.find((el) => {
        return el.questionNumber == q;
      });

    if (q == currQuestionNumber) {
      return classes.current;
    } else if (includes) {
      return classes.answered;
    } else if (visited.has(q) && !includes) {
      return classes.skip;
    } else {
      return classes.paper;
    }
  }

  return (
    <div style={classes.root}>
      {/* Legand for Question Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <div style={classes.overViewLegand}>
          <div style={classes.overViewLegandSub}>
            <div
              style={{
                height: "15px",
                width: "15px",
                backgroundColor: "#69db99",
                borderRadius: "0.2rem",
              }}
            />
            <span style={{ color: "#69db99" }}>Current Question</span>
          </div>
          <div style={classes.overViewLegandSub}>
            <div
              style={{
                height: "15px",
                width: "15px",
                backgroundColor: "#666666",
                borderRadius: "0.2rem",
              }}
            />
            <span style={{ color: "#666666" }}>Answered</span>
          </div>
        </div>
      </div>
      <Grid container spacing={1}>
        {questions.map((q, i) => {
          return (
            <Grid item sm={3} xs={3} md={1} lg={1} xl={1} key={i}>
              <Paper
                style={findPage(questionNumber, q.questionNumber)}
                onClick={() => handleClick(q)}
              >
                {q.questionNumber}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Navigate;
