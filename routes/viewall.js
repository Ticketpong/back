const express = require("express");
const router = express.Router();
const viewAll = require("../controllers/viewAllController");

// Get ranking
router.get("/ranking", viewAll.ranking);

// Get all performances
router.get("/", viewAll.viewAll);

module.exports = router;
