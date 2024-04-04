const express = require("express");
const router = express.Router();
const memberMain = require("../../controllers/infoController");
const performance = require("../../controllers/performanceController");

router.get("/main", memberMain.getMemberMain);

router.put("/edit", memberMain.editMember);

router.delete("/edit", memberMain.deleteMember);

router.get("/list", performance.getPerformanceList);

module.exports = router;
