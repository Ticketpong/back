const express = require("express");
const router = express.Router();
const findController = require("../../controllers/findIdPasswordController");

// post findId
// 아이디 찾기
router.post("/findId", findController.findId);

// post findPassword
// 비밀번호 찾기
router.post("/findPassword", findController.findPassword);

module.exports = router;
