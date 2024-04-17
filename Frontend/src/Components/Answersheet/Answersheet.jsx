import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetAnswerPaper } from "./hooks/useGetAnswerSheet.jsx";
import {
  LinearProgress,
  Typography,
  TextField,
  Container,
  Chip,
} from "@mui/material";
import Papers from "./subcomponents/Papers.jsx";

const myStyles = {
  detailContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailSubject: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
  },
  detailName: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  detailCheck: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  instructions: {
    cursor: "pointer",
    background: "rgba(247, 192, 40, 0.2)",
  },
  marksheetHeading: {
    marginTop: "-1rem",
    fontSize: "1.1rem",
  },
  termType: {
    textAlign: "center",
    marginBottom: "-1rem",
  },
  topicwiseHeading: {
    textAlign: "left",
    margin: "1rem",
    fontSize: "1.2rem",
  },
  chip: {
    color: "#167296",
    background: "#f3ebd8",
    fontWeight: "500",
  },
  chipName: {
    textTransform: "capitalize",
    color: "#167296",
    background: "#f3ebd8",
    fontWeight: "500",
  },
};

function Answersheet() {
  let { answerSheetId } = useParams();
  let { paper, loading, getPaper } = useGetAnswerPaper();

  useEffect(() => {
    getPaper({ answerSheetId });
  }, []);

  return (
    <Container
      maxWidth="1200px"
      sx={{ textAlign: "center", marginTop: "5rem", paddingBottom: "1rem" }}
    >
      {loading && <LinearProgress />}
      {paper && !paper.answerSheetObj.checkedBy && <h1>Paper Not Evaluated</h1>}
      {paper && paper.answerSheetObj.checkedBy && (
        <div style={myStyles.detailContainer}>
          <div style={myStyles.detailName}>
            <Chip
              label={`${paper.answerSheetObj.studentName}, ${paper.answerSheetObj.subject}`}
              style={myStyles.chipName}
            />
          </div>
          <div style={myStyles.detailSubject}>
            <Chip
              label={`Term: ${paper.answerSheetObj.term}`}
              style={myStyles.chip}
            />
          </div>
          <div style={myStyles.detailCheck}>
            <Chip
              label={`Checked by: ${paper.answerSheetObj.checkedBy}, Time taken: ${paper.answerSheetObj.timeTaken}, Marks: ${paper.answerSheetObj.totalMarksObtained}/
                ${paper.answerSheetObj.totalMarks}`}
              style={myStyles.chip}
            />
          </div>
        </div>
      )}
      {paper && paper.evaluatedPaper && (
        <Typography variant="h6" style={myStyles.topicwiseHeading}>
          Section Wise Evaluation
        </Typography>
      )}
      {paper &&
        paper.evaluatedPaper &&
        paper.evaluatedPaper.map((el, i) => {
          return <Papers key={i} el={el} />;
        })}

      {paper && (
        <TextField
          sx={{
            input: { color: "whitesmoke" },
            label: { color: "whitesmoke" },
            fieldset: { borderColor: "whitesmoke" },
          }}
          fullWidth
          style={{ marginTop: "1rem" }}
          value={paper.answerSheetObj.comment}
          id="standard-basic"
          label=" Overall Comment:"
        />
      )}
    </Container>
  );
}

export default Answersheet;
