const express = require("express");
const router = express.Router();
const signup = require("../../controllers/signupController");

router.get("/", signup.getSignup);

router.get("/signup", signup.getSignup);

router.post("/", signup.memberSignup);

router.post("/idcheck", signup.idCheck);

router.post("/emailcheck", signup.emailCheck);

module.exports = router;
