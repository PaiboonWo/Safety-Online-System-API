const express = require("express");
const router = express.Router();
const serverCommon = require("../../WorkService/02-KYT-System/Model_Common.cjs");

router.post("/comm_getstatus", serverCommon.GetStatus);

module.exports = router;
