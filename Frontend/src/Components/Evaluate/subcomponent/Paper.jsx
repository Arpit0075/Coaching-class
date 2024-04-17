import React, { useState } from "react";
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
    fontWeight: "680",
    color: "#fffafa",
  },
  marksheetQuestion: {
    fontSize: "1.1rem",
    fontWeight: "400",
    color: "#fffafa",
  },
  chip: {
    color: "#167296",
    background: "#f3ebd8",
    fontWeight: "500",
  },
};

function Paper({ setAnswers, answers, question, checked }) {
  const [comment, setComment] = useState("");
  const [marks, setMarks] = useState(0);

  const handleChange = ({ event, type }) => {
    let arr = [...answers];
    let curr = arr.find((cu) => cu.questionNumber == question.questionNumber);
    if (type === "comment") {
      setComment(event.target.value);

      if (answers.length === 0 || !curr) {
        setAnswers((prev) => [
          ...prev,
          { ...question, marksAllocated: +marks, comment: event.target.value },
        ]);
      } else {
        let newState = answers.map((a) => {
          if (a.questionNumber === question.questionNumber) {
            return {
              ...a,
              marksAllocated: +marks,
              comment: event.target.value,
            };
          }
          return a;
        });
        setAnswers(newState);
      }
    }

    if (type === "marks") {
      let reg = /^\d*\.?\d*$/;
      if (!reg.test(event.target.value)) {
        return;
      }
      if (+event.target.value <= question.marks) {
        setMarks(event.target.value);
        if (answers.length === 0 || !curr) {
          setAnswers((prev) => [
            ...prev,
            {
              ...question,
              marksAllocated: +event.target.value,
              comment: comment,
            },
          ]);
        } else {
          let newState = answers.map((a) => {
            if (a.questionNumber === question.questionNumber) {
              return {
                ...a,
                marksAllocated: +event.target.value,
                comment: comment,
              };
            }
            return a;
          });
          setAnswers(newState);
        }
      }
    }
  };

  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "0.5rem",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
        color: "#115975",
      }}
    >
      <Typography variant="h6" style={myStyles.marksheetQuestionHeading}>
        {question.questionNumber}: {question.description}
      </Typography>
      <Typography variant="h6" style={myStyles.marksheetQuestion}>
        <Chip label={`Topic: ${question.topic}`} style={myStyles.chip} />
      </Typography>
      {question.questionType !== "Drawing" &&
        question.questionType !== "Graph" && (
          <Typography variant="h6" style={myStyles.marksheetQuestion}>
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
      <Typography variant="h6" style={myStyles.marksheetQuestion}>
        Marks: {question.marks}
      </Typography>

      {question.options && !checked && (
        <div style={myStyles.EvalBtnContainer}>
          <TextField
            style={{ width: "60%" }}
            value={comment}
            sx={{
              input: { color: "whitesmoke" },
              label: { color: "whitesmoke" },
              fieldset: { borderColor: "whitesmoke" },
            }}
            id="standard-basic"
            label="Remark"
            onChange={(event) =>
              handleChange({ event: event, type: "comment" })
            }
          />
          <div style={{ marginTop: "1rem" }} />
        </div>
      )}
      {!question.options && !checked && (
        <div style={myStyles.EvalBtnContainer}>
          <TextField
            style={{ width: "60%" }}
            value={comment}
            sx={{
              input: { color: "whitesmoke" },
              label: { color: "whitesmoke" },
              fieldset: { borderColor: "whitesmoke" },
            }}
            id="standard-basic"
            label="Remark"
            onChange={(event) =>
              handleChange({ event: event, type: "comment" })
            }
          />
          <TextField
            value={marks}
            sx={{
              input: { color: "whitesmoke" },
              label: { color: "whitesmoke" },
              fieldset: { borderColor: "whitesmoke" },
            }}
            id="standard-basic"
            label="Allocate marks"
            onChange={(event) => handleChange({ event: event, type: "marks" })}
          />
          <div style={{ marginTop: "1rem" }} />
        </div>
      )}
    </div>
  );
}

export default Paper;
