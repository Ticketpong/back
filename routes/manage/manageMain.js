const express = require("express");
const router = express.Router();
const manage = require("../../controllers/infoController");
const member = require("../../controllers/infoController");
const performance = require("../../controllers/performanceController");

router.get("/manageList", manage.getManageList);

router.get("/memberList", member.getMemeberList);

router.put("/manageEdit", manage.editManage);

router.delete("/delete", manage.deleteManage);

router.get("/performance", performance.getPerformanceList);

router.put("/performanceEdit", performance.editPerformance);

router.delete("/performanceDelete", performance.deletePerformance);

router.post("/performanceAdd", performance.addPerformance);

module.exports = router;
