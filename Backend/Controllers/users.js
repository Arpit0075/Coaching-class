const User = require("../Models/User");

exports.getUsers = async (req, res) => {
  let user = req.body.user.user.type;

  try {
    if (user === "ADMIN") {
      let users = await User.find();
      res.json(users);
    }
  } catch (e) {
    console.log(e);
  }
};

exports.getUser = async (req, res) => {
  let studentId = req.params.studentId;
  try {
    let user = await User.findOne({ _id: studentId });
    res.send(user);
  } catch (e) {
    console.log(e);
  }
};
