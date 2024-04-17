import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Graph from "./Graph";
import domtoimage from "dom-to-image";

const myStyles = {
  drawingQuestionContainer: {
    padding: "1rem",
  },
  drawingContainer: {
    width: "100%",
    padding: "1rem",
  },
};

function GraphQuestions({
  currentQuestionArr,
  questionNumber,
  question,
  setAnswerArr,
  answerArr,
  findDefaultAnswers,
}) {
  const [graphData, setGraphData] = useState([]);

  const [inputFields, setInputFields] = useState([
    {
      x: [],
      y: [],
      type: "line",
    },
  ]);

  const findAnswer = () => {
    let value = findDefaultAnswers(answerArr, currentQuestionArr);
    if (value) {
      return value;
    } else return "";
  };

  useEffect(() => {
    let value = findAnswer();
    if (value) {
      setInputFields(value.inputFields);
      setGraphData(value.graphData);
    }
  }, [questionNumber]);

  const handleSubmitAnswer = async ({ questionNumber, question }) => {
    let image = document.getElementById(`graph-${questionNumber}`);
    let imgAnswer = await domtoimage.toPng(image);

    let answer = {
      inputFields: inputFields,
      graphData: graphData,
      imgAnswer: imgAnswer,
    };
    let newObj = {
      questionNumber: questionNumber,
      answer: answer,
      question: question,
    };
    let arr = [...answerArr];
    let curr = arr.find((el) => el.questionNumber == questionNumber);

    if (answerArr.length === 0 || !curr) {
      setAnswerArr((prev) => [...prev, newObj]);
    } else {
      let newState = answerArr.map((el) => {
        if (el.questionNumber == questionNumber) {
          let answer = {
            inputFields: inputFields,
            graphData: graphData,
            imgAnswer: imgAnswer,
          };
          return { ...el, answer: answer };
        }
        return el;
      });
      setAnswerArr(newState);
    }
  };

  return (
    <div style={myStyles.drawingQuestionContainer}>
      <div style={myStyles.drawingContainer}>
        <Graph
          questionNumber={questionNumber}
          graphData={graphData}
          setGraphData={setGraphData}
          inputFields={inputFields}
          setInputFields={setInputFields}
        />
      </div>
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

export default GraphQuestions;
