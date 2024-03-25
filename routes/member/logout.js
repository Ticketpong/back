const express = require("express");
const router = express.Router();
const logout = require("../../controllers/loginController");

router.get("/", logout.getLogout);

module.exports = router;
