import React from "react";
import { Typography, TextField, Chip } from "@mui/material";

const myStyles = {
  instructions: {
    cursor: "pointer",
    background: "rgba(247, 192, 40, 0.2)",
    color: "#fffafa",
  },
  EvalBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
  },
  marksheetQuestionHeading: {
    fontSize: "1.1rem",
    fontWeight: "500",
    color: "#fffafa",
  },
  marksheetQuestion: {
    fontSize: "1.1rem",
    color: "#fffafa",
  },
  studentResponse: {
    fontSize: "1.1rem",
    fontWeight: "400",
    textAlign: "left",
    color: "#fffafa",
    marginBottom: "0.4rem",
    padding: "0.2rem",
  },
  chip: {
    color: "#167296",
    background: "#f3ebd8",
  },
};

function Paper({ question, topicWise }) {
  return (
    <div
      style={{
        padding: "0.5rem",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
        color: "#115975",
      }}
    >
      {question && (
        <>
          <Typography variant="h6" style={myStyles.marksheetQuestionHeading}>
            {question.questionNumber}: {question.description}
          </Typography>
          <Typography variant="h6" style={myStyles.marksheetQuestion}>
            <Chip label={`Topic: ${question.topic}`} style={myStyles.chip} />
          </Typography>
          {question.questionType !== "Drawing" &&
            question.questionType !== "Graph" && (
              <Typography variant="h6" style={myStyles.studentResponse}>
                Student Response: {question.studentAnswer}
              </Typography>
            )}
          {question.questionType === "Drawing" && (
            <Typography variant="h6" style={myStyles.marksheetQuestion}>
              Student Response:
              <img
                style={{ width: "50%", objectFit: "contain" }}
                src={question.studentAnswer}
                alt="drawing"
              />
            </Typography>
          )}
          {question.questionType === "Graph" && (
            <Typography variant="h6" style={myStyles.marksheetQuestion}>
              Student Response:
              <img
                style={{ width: "50%", objectFit: "contain" }}
                src={question.studentAnswer.imgAnswer}
                alt="graph"
              />
            </Typography>
          )}

          {topicWise && (
            <Typography variant="h6" style={myStyles.marksheetQuestion}>
              Marks: {question.marks}
            </Typography>
          )}
        </>
      )}
      <div style={myStyles.EvalBtnContainer}>
        <TextField
          style={{ width: "60%" }}
          value={question.comment}
          id="standard-basic"
          label="Remark"
          sx={{
            input: { color: "whitesmoke" },
            label: { color: "whitesmoke" },
            fieldset: { borderColor: "whitesmoke" },
          }}
        />
        <TextField
          value={question.marksAllocated}
          id="standard-basic"
          label="Allocated marks"
          sx={{
            input: { color: "whitesmoke" },
            label: { color: "whitesmoke" },
            fieldset: { borderColor: "whitesmoke" },
          }}
        />
      </div>
    </div>
  );
}

export default Paper;
