const express = require("express");
const router = express.Router();
const Transaction = require("../../WorkService/04-Work-Permit-System/Model_Transection.cjs");

router.post("/getstatus", Transaction.GetStatus);
router.post("/getissue_approve_mlist_search", Transaction.GetTransIssue_Approve_Masterlist_Search);

module.exports = router;