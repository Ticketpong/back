const express = require("express");
const router = express.Router();
const manageMain = require("../../controllers/infoController");

router.get("/manager", manageMain.getManageDetail);

router.put("/manager/edit", manageMain.editManage);

router.delete("/manager", manageMain.deleteManage);

module.exports = router;
