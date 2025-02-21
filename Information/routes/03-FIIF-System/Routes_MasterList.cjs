const express = require("express");
const router = express.Router();
const serverMasterList = require("../../WorkService/03-FIIF-System/Model_MasterList.cjs");

router.post("/mlist_get_issue_approve_masterlist_search", serverMasterList.Mlist_Get_Issue_Approve_Masterlist_Search);

module.exports = router;