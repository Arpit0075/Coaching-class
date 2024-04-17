import React from "react";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
//import DialogTitle from "@material-ui/core/DialogTitle";

import {
  Chip,
  LinearProgress,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function ConfirmPopup({
  openConfirm,
  handleConfirmCancel,
  hanldeMarksSubmission,
  answers,
  optionalMarksObtained,
  totalMarks,
}) {
  const calculateTotal = () => {
    let descriptionTotalMarks = 0;
    answers &&
      answers.forEach((el) => {
        descriptionTotalMarks += el.marksAllocated;
      });
    let totalMarksObtained = optionalMarksObtained + descriptionTotalMarks;
    return totalMarksObtained;
  };

  return (
    <div>
      <Dialog
        open={openConfirm}
        onClose={handleConfirmCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Summary</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>
              Total Marks Obtained: {calculateTotal()} Out of {totalMarks}
            </p>
            <p> Are you sure, you want to submit the marks?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmCancel()} color="primary">
            Back
          </Button>
          <Button
            onClick={() => hanldeMarksSubmission()}
            color="primary"
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmPopup;
