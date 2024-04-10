const express = require("express");
const router = express.Router();
const memberMain = require("../../controllers/infoController");
const performance = require("../../controllers/performanceController");

// pw check
router.post("/pwCheck", memberMain.postMemberPwCheck);

// post member main page
router.post("/member", memberMain.postMember);

// member edit page
router.put("/edit", memberMain.editMember);

// member delete page
router.delete("/delete", memberMain.deleteMember);

// performance list page
router.get("/list", performance.getPerformanceList);

module.exports = router;
