const express = require("express");
const router = express.Router();
const apiLogController = require("../controllers/apiLogController");

router.get("/api-call-counts", apiLogController.getApiCallCounts);

module.exports = router;
