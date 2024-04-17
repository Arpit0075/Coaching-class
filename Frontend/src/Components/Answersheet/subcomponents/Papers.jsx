import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "./Paper";

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
  paperContainer: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    color: "#fffafa",
    fontSize: "1rem",
  },
};

function Papers({ el }) {
  const calcMarks = () => {
    let totalMarks = 0;
    let marksAllocated = 0;
    el.questions.forEach((e) => {
      totalMarks += e.marks;
      marksAllocated += e.marksAllocated;
    });

    return { totalMarks, marksAllocated };
  };
  let { totalMarks, marksAllocated } = calcMarks();

  let totalQuestions = el.questions.length;
  let marks = el.questions[0].marks;

  return (
    <div
      style={{
        marginTop: "1rem",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
        color: "#fffafa",
      }}
    >
      <Accordion sx={{ background: "#28282B" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "whitesmoke" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography style={myStyles.heading}>
              {el.section} {`(${totalQuestions} * ${marks})`}
            </Typography>
            <Typography style={myStyles.heading}>
              Marks Scored: {`${marksAllocated} / ${totalMarks}`}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails style={myStyles.paperContainer}>
          {el &&
            el.questions.map((question, i) => {
              return <Paper key={i} question={question} topicWise={false} />;
            })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Papers;
