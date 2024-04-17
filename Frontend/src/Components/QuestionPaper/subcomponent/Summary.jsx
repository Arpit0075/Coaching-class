import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

function Summary({
  openSummary,
  setOpenSummary,
  examTimeStart,
  answerArr,
  totalQuestions,
  totalMarks,
}) {
  const navigate = useNavigate();

  // calculating time taken
  let date = Date.now();
  let timediff = date - examTimeStart;
  let minutes = Math.floor(timediff / 60000);
  let seconds = ((timediff % 60000) / 1000).toFixed(0);
  let sec = (seconds < 10 ? "0" : "") + seconds;

  const final_sec = sec;
  const final_min = minutes;

  return (
    <div>
      <Dialog
        open={openSummary}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Summary</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Total Marks: {totalMarks} Total Questions: {totalQuestions}{" "}
            Questions Answered: {answerArr.length} Time Taken: {final_min}:
            {final_sec}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            //onClick should take back to testlist page
            onClick={() => {
              setOpenSummary(false);
              navigate("/papers");
            }}
            color="primary"
          >
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Summary;
