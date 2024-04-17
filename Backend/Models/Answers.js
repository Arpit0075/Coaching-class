const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  questionPaperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  subject: { type: String, required: true },
  term: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  studentID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  subjectMarks: [],
  checkedBy: { type: String },
  marksheet: [],
  term: {
    type: String,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  totalMarksObtained: {
    type: Number,
  },
  timeTaken: {
    type: String,
  },
  comment: {
    type: String,
  },
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
