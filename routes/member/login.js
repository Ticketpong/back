const express = require("express");
const router = express.Router();
const login = require("../../controllers/loginController");

router.get("/", login.getLogin);

router.get("/member/login", login.getLogin);

router.post("/", login.memberLogin);

module.exports = router;
