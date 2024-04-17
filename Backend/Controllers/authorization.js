const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.auth = async (req, res, next) => {
  //check if token exists
  if (!req.headers["token"])
    return res.status(401).send({ message: "User Unauthorized!" });

  //if token exists
  try {
    req.body.user = jwt.verify(req.headers["token"], process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.send(err);
  }
};
