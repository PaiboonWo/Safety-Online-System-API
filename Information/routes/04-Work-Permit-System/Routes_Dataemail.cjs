const express = require("express");
const router = express.Router();
const Dataemail = require("../../WorkService/04-Work-Permit-System/Model_Dataemail.cjs");

router.post("/trans_getissueapprove_sendemail", Dataemail.GetIssueApproveData_Email);

module.exports = router;