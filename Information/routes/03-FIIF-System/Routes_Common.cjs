const express = require("express");
const router = express.Router();
const serverCommon = require("../../WorkService/03-FIIF-System/Model_Common.cjs");

router.post("/comm_getstatus", serverCommon.comm_get_status);

module.exports = router;
