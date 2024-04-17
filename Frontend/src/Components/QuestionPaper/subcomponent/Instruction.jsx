import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Instruction({
  instructions,
  duration,
  totalMarks,
  openInstructions,
  setOpenInstructions,
  setStartExam,
}) {
  const handleSubmit = () => {
    setOpenInstructions(false);
    setStartExam(true);
  };

  return (
    <div className="container" style={{ padding: "1rem" }}>
      <Dialog
        open={openInstructions}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Instructions</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {instructions}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Exam Duation: {duration}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Total Marks: {totalMarks}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Start Test
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Instruction;
