const express = require("express");
const mongo = require("./connection");
const cors = require("cors");
const port = process.env.PORT || 3001;
const app = express();
const authRouter = require("./Routes/auth");
const usersRouter = require("./Routes/users");
const classDetailsRouter = require("./Routes/classDetails");
const recordsRouter = require("./Routes/records");
const authorization = require("./Controllers/authorization");
require("dotenv").config();

app.use(cors());

async function loadapp() {
  try {
    mongo.connect();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      res.send("hello!");
    });

    //routes
    app.use("/auth", authRouter);

    app.use(authorization.auth);
    //protected route
    app.use("/users", usersRouter);
    app.use("/classDetails", classDetailsRouter);
    app.use("/records", recordsRouter);

    app.listen(port);
  } catch (err) {
    console.log(err);
  }
}
loadapp();
