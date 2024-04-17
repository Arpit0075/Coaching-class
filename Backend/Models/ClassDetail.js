const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classDetailSchema = new Schema({
  subjects: {
    type: [],
    required: true,
  },
  terms: {
    type: [],
    required: true,
  },
  termsUploaded: {
    type: [],
    required: true,
  },
});

const ClassDetail = mongoose.model("ClassDetail", classDetailSchema);
module.exports = ClassDetail;
