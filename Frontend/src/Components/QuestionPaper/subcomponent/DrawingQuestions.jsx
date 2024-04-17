import React from "react";
import { Button } from "@mui/material";
import DrawingBoard from "./DrawingBoard.jsx";
import domtoimage from "dom-to-image";

function DrawingQuestions({
  questionNumber,
  question,
  setAnswerArr,
  answerArr,
  findDefaultAnswers,
  currentQuestionArr,
}) {
  const findAnswer = () => {
    let value = findDefaultAnswers(answerArr, currentQuestionArr);
    if (value) {
      return value;
    } else return "";
  };

  const handleSubmitAnswer = async ({ questionNumber, question }) => {
    let image = document.getElementById(`drawing-${questionNumber}`);
    let imgAnswer = await domtoimage.toPng(image);

    let newObj = {
      questionNumber: questionNumber,
      answer: imgAnswer,
      question: question,
    };
    let arr = [...answerArr];
    let curr = arr.find((el) => el.questionNumber == questionNumber);

    if (answerArr.length === 0 || !curr) {
      setAnswerArr((prev) => [...prev, newObj]);
    } else {
      let newState = answerArr.map((el) => {
        if (el.questionNumber == questionNumber) {
          return { ...el, answer: imgAnswer };
        }
        return el;
      });
      setAnswerArr(newState);
    }
  };

  return (
    <>
      <DrawingBoard questionNumber={questionNumber} findAnswer={findAnswer} />
      <Button
        style={{ margin: "1rem 0 1rem 0" }}
        variant="contained"
        color="primary"
        onClick={() =>
          handleSubmitAnswer({
            questionNumber: questionNumber,
            question: question,
          })
        }
      >
        Submit
      </Button>
    </>
  );
}

export default DrawingQuestions;
