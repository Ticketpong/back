const express = require("express");
const router = express.Router();
const manage = require("../../controllers/infoController");
const member = require("../../controllers/infoController");
const performance = require("../../controllers/performanceController");

// get manage list
router.get("/manageList", manage.getManageList);

// get member list
router.get("/memberList", member.getMemeberList);

// manage post edit
router.post("/manageProfile", manage.getManageProfile);

// manage edit
router.put("/manageEdit", manage.editManage);

// manage delete
router.delete("/delete", manage.deleteManage);

// performance get edit
router.get("/performance", performance.getPerformanceList);

// performance edit
router.put("/performanceEdit", performance.editPerformance);

// performance delete
router.delete("/performanceDelete", performance.deletePerformance);

// performance add
router.post("/performanceAdd", performance.addPerformance);

module.exports = router;
