const express = require("express");
const router = express.Router();
const serverDataemail = require("../../WorkService/02-KYT-System/Model_Dataemail.cjs");

router.post("/trans_get_issue_approve_send_email", serverDataemail.Get_Issue_Approve_Data_Email);

module.exports = router;
