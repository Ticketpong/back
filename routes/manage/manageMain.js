const express = require("express");
const router = express.Router();
const manageMain = require("../../controllers/mainController");

router.get("/", manageMain.getManageMain);

module.exports = router;
