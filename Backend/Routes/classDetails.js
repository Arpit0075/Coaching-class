const router = require("express").Router();
const getClassDetailsController = require("../Controllers/classDetails");

router.get("/", getClassDetailsController.getClassDetails);

module.exports = router;
