const express = require("express");
const router = express.Router();
const manage = require("../../controllers/infoController");
const member = require("../../controllers/infoController");

router.get("/manageList", manage.getManageList);

router.get("/memberList", member.getMemeberList);

router.put("/manageEdit", manage.editManage);

router.delete("/delete", manage.deleteManage);

module.exports = router;
