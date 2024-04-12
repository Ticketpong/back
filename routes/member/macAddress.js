const express = require("express");
const router = express.Router();
const macAddress = require("../../controllers/macAddressController");

// macAddress 저장 (http://localhost:3000/macAddress)
router.post("/", macAddress.create);

// macAddress 가져오기 (http://localhost:3000/macAddress/profile)
router.post("/profile", macAddress.get);

// macAddress 수정 (http://localhost:3000/macAddress/edit)
router.put("/edit", macAddress.update);

module.exports = router;
