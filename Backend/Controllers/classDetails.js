const User = require("../Models/User");
const ClassDetail = require("../Models/ClassDetail");

exports.getClassDetails = async (req, res) => {
  let user = req.body.user.user.type;

  try {
    let details = await ClassDetail.find();
    res.send(details);
  } catch (e) {
    console.log(e);
  }
};
