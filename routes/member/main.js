const express = require("express");
const router = express.Router();
const memberMain = require("../../controllers/infoController");
const performance = require("../../controllers/performanceController");

// get member
router.get("/member", memberMain.getMemberMain);

// member edit
router.put("/edit", memberMain.editMember);

// member delete
router.delete("/delete", memberMain.deleteMember);

// get performance list
router.get("/list", performance.getPerformanceList);

module.exports = router;
