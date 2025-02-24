const express = require("express");
const router = express.Router();
const Masterlist = require("../../WorkService/04-Work-Permit-System/Model_Masterlist.cjs");

router.post("/getstatus", Masterlist.GetStatus);
router.post("/getissue_approve_mlist_search", Masterlist.GetTransIssue_Approve_Masterlist_Search);

module.exports = router;