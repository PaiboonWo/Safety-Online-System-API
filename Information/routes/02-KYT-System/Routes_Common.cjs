const express = require("express");
const router = express.Router();
const serverCommon = require("../../WorkService/02-KYT-System/Model_Common.cjs");

router.post("/common_getfactory", serverCommon.GetFactory);
router.post("/common_getcostcenter", serverCommon.GetCostCenter);
router.post("/common_getstatus", serverCommon.GetStatus);
router.post("/common_getusername", serverCommon.GetUserName);
router.post("/common_getmemberusername", serverCommon.GetMemberUserName); 
router.post("/common_getuserlogin", serverCommon.GetUserLogin); 
module.exports = router;
