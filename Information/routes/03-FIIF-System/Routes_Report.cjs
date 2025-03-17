const express = require("express");
const router = express.Router();
const serverReport = require("../../WorkService/03-FIIF-System/Model_Report.cjs");

router.post("/report_get_datareportall", serverReport.Report_Get_Datareportall);

module.exports = router;