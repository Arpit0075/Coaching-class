const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.send({ message: "user already exist" });

    //create new user
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      type: "STUDENT",
    });
    const response = await newUser.save();
    res.send({ message: "user registered" });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

exports.login = async (req, res) => {
  //checking email if exists
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send({ message: "email not registered" });

    //checking password if email matches
    if (user.type !== "ADMIN") {
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid)
        return res.send({ message: "email or password does not match" });
    }

    //if password matches we generate jwt token
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token: token });
  } catch (err) {
    res.send(err.message);
  }
};
