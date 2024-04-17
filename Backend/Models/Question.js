const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  subject: { type: String, required: true },
  term: {
    type: String,
    required: true,
  },
  questionPaper: [],
  instructions: {
    type: String,
  },
  instructions: {
    type: String,
  },
  totalMarks: {
    type: Number,
  },
  duration: {
    type: String,
  },
  topics: [],
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
