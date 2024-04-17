import React from "react";
import Paper from "./Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  },
};

function Papers({ el, setAnswers, answers, checked }) {
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
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={myStyles.heading}>{el.section}</Typography>
        </AccordionSummary>
        <AccordionDetails style={myStyles.paperContainer}>
          {el &&
            el.questions.map((question, i) => {
              return (
                <Paper
                  key={i}
                  question={question}
                  setAnswers={setAnswers}
                  answers={answers}
                  checked={checked}
                />
              );
            })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Papers;
