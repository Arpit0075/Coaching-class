require("dotenv").config();
const ClassDetail = require("./Models/ClassDetail");

exports.connect = async () => {
  try {
    let localUrl = "mongodb://localhost:27017/coachingClass";
    const mongoose = require("mongoose");
    mongoose.set("strictQuery", false);
    mongoose.connect(
      //process.env.MONGODB_URL,
      localUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    let clas = await ClassDetail.find();

    if (!clas || clas.length === 0) {
      let subjects = ["English", "Math", "Science"];
      let terms = ["term-1", "term-2", "term-3"];
      let termsUploaded = [];

      for (let t of terms) {
        for (let s of subjects) {
          termsUploaded.push({
            term: t,
            subject: s,
            uploaded: false,
          });
        }
      }

      let clasObj = {
        subjects,
        terms,
        termsUploaded,
      };
      await ClassDetail.create(clasObj);
    }
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
