const router = require("express").Router();
const userAuthController = require("../Controllers/userAuth");

router.post("/register", userAuthController.register);
router.post("/login", userAuthController.login);

module.exports = router;
