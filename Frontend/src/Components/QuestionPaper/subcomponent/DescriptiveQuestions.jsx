import React, { useEffect } from "react";
import { Button, TextareaAutosize } from "@mui/material";

function DescriptiveQuestions({
  descriptiveAnswer,
  setDescriptiveAnswer,
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

  useEffect(() => {
    let value = findAnswer();

    if (value) {
      setDescriptiveAnswer(value);
    }
  }, [questionNumber]);

  const handleSubmitAnswer = ({ questionNumber, question }) => {
    let newObj = {
      questionNumber: questionNumber,
      answer: descriptiveAnswer,
      question: question,
    };
    let arr = [...answerArr];
    let curr = arr.find((el) => el.questionNumber == questionNumber);

    if (answerArr.length === 0 || !curr) {
      setAnswerArr((prev) => [...prev, newObj]);
    } else {
      let newState = answerArr.map((el) => {
        if (el.questionNumber == questionNumber) {
          return { ...el, answer: descriptiveAnswer };
        }
        return el;
      });

      setAnswerArr(newState);
    }
  };

  return (
    <div>
      <TextareaAutosize
        minRows={8}
        style={{ width: "100%", fontSize: "1rem" }}
        value={descriptiveAnswer}
        onChange={(e) => {
          setDescriptiveAnswer(e.target.value);
        }}
      />
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
    </div>
  );
}

export default DescriptiveQuestions;
