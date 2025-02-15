const express = require("express");
const router = express.Router();
const serverTransaction = require("../../WorkService/03-FIIF-System/Model_Transection.cjs");

router.post("/trans_gettrans_issue_approve_masterlist_search", serverTransaction.GetTransIssue_Approve_Masterlist_Search);

module.exports = router;