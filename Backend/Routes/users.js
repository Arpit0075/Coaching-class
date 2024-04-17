const router = require("express").Router();
const usersListController = require("../Controllers/users");

router.get("/", usersListController.getUsers);
router.get("/:studentId", usersListController.getUser);

module.exports = router;
