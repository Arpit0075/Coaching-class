import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPaper } from "./hooks/useGetPaper";
import { usePostPaper } from "./hooks/usePostPaper";
import Container from "@mui/material/Container";
import { Chip, LinearProgress, TextField, Button } from "@mui/material";
import Papers from "./subcomponent/Papers";
import ConfirmPopup from "./subcomponent/ConfirmPopup";

const myStyles = {
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
    fontSize: "1.2rem",
  },
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

function Evaluate() {
  let { loading, paper, getPaper } = useGetPaper();
  let { postPaper } = usePostPaper();
  let { answerSheetId } = useParams();
  let navigate = useNavigate();

  const [answers, setAnswers] = useState([]);
  const [overAllComment, setOverAllComment] = useState("");
  const [submitBtnDisable, setSubmitBtnDisable] = useState(true);

  //confrim popup
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleConfirm = () => {
    setOpenConfirm(true);
  };
  const handleConfirmCancel = () => {
    setOpenConfirm(false);
  };

  useEffect(() => {
    getPaper({ answerSheetId });
  }, []);

  // enabling/disabling submit button
  useEffect(() => {
    let arr = [];
    answers.forEach((el) => {
      if (!el.options) {
        arr.push(el);
      }
    });
    if (
      paper &&
      paper.marksheet &&
      paper.totalNumberQuestionEvaluate === arr.length
    ) {
      setSubmitBtnDisable(false);
    } else {
      setSubmitBtnDisable(true);
    }
  }, [answers]);

  const hanldeMarksSubmission = () => {
    // send data to backend , save it
    postPaper({
      checked: answers,
      totalQuestions: paper.questionObject,
      answerSheetId: answerSheetId,
      overAllComment: overAllComment,
    });

    handleConfirmCancel();
    navigate("/evaluatePapers");
  };

  return (
    <Container
      maxWidth="1200px"
      sx={{ textAlign: "center", marginTop: "5rem", paddingBottom: "1rem" }}
    >
      {loading && <LinearProgress />}
      {paper && (
        <div style={myStyles.detailContainer}>
          <div style={myStyles.detailName}>
            <Chip
              label={`${paper.questionObject.studentName}, ${paper.questionObject.subject}`}
              style={myStyles.chipName}
            />
          </div>
          <div style={myStyles.detailSubject}>
            <Chip
              label={`Term: ${paper.questionObject.term}`}
              style={myStyles.chip}
            />
          </div>
          <div style={myStyles.detailCheck}>
            <Chip
              label={`Time taken: ${paper.questionObject.timeTaken}, Total marks: ${paper.questionObject.totalMarks}`}
              style={myStyles.chip}
            />
          </div>
        </div>
      )}
      {paper &&
        paper.marksheet &&
        paper.marksheet.map((el, i) => {
          return (
            <Papers key={i} el={el} setAnswers={setAnswers} answers={answers} />
          );
        })}
      {paper && paper.marksheet && (
        <TextField
          sx={{
            input: { color: "whitesmoke" },
            label: { color: "whitesmoke" },
            fieldset: { borderColor: "whitesmoke" },
          }}
          fullWidth
          value={overAllComment}
          id="standard-basic"
          label="Overall Comment"
          onChange={(event) => setOverAllComment(event.target.value)}
        />
      )}

      {paper && paper.marksheet && (
        <Button
          variant="contained"
          color="success"
          sx={{ marginTop: "0.5rem" }}
          disabled={submitBtnDisable}
          onClick={handleConfirm}
        >
          Submit
        </Button>
      )}
      {paper && (
        <ConfirmPopup
          openConfirm={openConfirm}
          handleConfirmCancel={handleConfirmCancel}
          hanldeMarksSubmission={hanldeMarksSubmission}
          answers={answers}
          optionalMarksObtained={paper.optionalMarksObtained}
          totalMarks={paper.questionObject.totalMarks}
        />
      )}
    </Container>
  );
}

export default Evaluate;
