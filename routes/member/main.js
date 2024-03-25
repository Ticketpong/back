const express = require("express");
const router = express.Router();
const memberMain = require("../../controllers/infoController");

router.get("/main", memberMain.getMemberMain);

router.put("/edit", memberMain.editMember);

router.delete("/edit", memberMain.deleteMember);

module.exports = router;
