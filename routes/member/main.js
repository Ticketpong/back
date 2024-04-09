const express = require("express");
const router = express.Router();
const memberMain = require("../../controllers/infoController");
const performance = require("../../controllers/performanceController");

router.post("/", memberMain.postMemberPwCheck);

router.put("/edit", memberMain.editMember);

router.delete("/edit", memberMain.deleteMember);

router.get("/list", performance.getPerformanceList);

module.exports = router;
