const express = require("express");
const router = express.Router();
const macAddress = require("../../controllers/macAddressController");

// macAddress 저장 (http://localhost:8080/macAddress)
router.post("/", macAddress.create);

// macAddress 가져오기 (http://localhost:8080/macAddress/profile)
router.post("/profile", macAddress.get);

// macAddress 수정 (http://localhost:8080/macAddress/edit)
router.put("/edit", macAddress.update);

// 현재 사용자의 macAddress 가져오기 (http://localhost:8080/macAddress/current)
router.post("/current", macAddress.getCurrent);

module.exports = router;
