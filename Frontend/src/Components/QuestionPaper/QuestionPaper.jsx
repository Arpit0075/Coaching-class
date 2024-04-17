//component to be rendered when student takes an exam
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { useGetQuestionPaper } from "./hooks/useGetQuestionPaper";
import Instruction from "./subcomponent/Instruction";
import Question from "./subcomponent/Question.jsx";

function QuestionPaper() {
  let { questionPaperId } = useParams();

  const { getQuestionPaper, questionPaper } = useGetQuestionPaper();

  useEffect(() => {
    getQuestionPaper(questionPaperId);
  }, []);

  // instruction box
  const [openInstructions, setOpenInstructions] = useState(true);
  const [startExam, setStartExam] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  // exam time start
  const [examTimeStart, setExamTimeStart] = useState(null);

  useEffect(() => {
    if (startExam) {
      setExamTimeStart(Date.now());
    }
  }, [startExam]);

  return (
    <Container maxWidth="1200px" sx={{ marginTop: "-1.5rem" }}>
      {questionPaper && (
        <Instruction
          openInstructions={openInstructions}
          setStartExam={setStartExam}
          setOpenInstructions={setOpenInstructions}
          instructions={questionPaper.instructions}
          duration={questionPaper.duration}
          totalMarks={questionPaper.totalMarks}
        />
      )}

      {startExam && questionPaper && examTimeStart && (
        <Question
          duration={questionPaper.duration}
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
          questions={questionPaper.questionPaper}
          paperId={questionPaperId}
          examTimeStart={examTimeStart}
          totalMarks={questionPaper.totalMarks}
        />
      )}
    </Container>
  );
}

export default QuestionPaper;
