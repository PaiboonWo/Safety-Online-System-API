const express = require("express");
const router = express.Router();
const serverCommon = require("../../WorkService/00-Common/Model_Common.cjs");


router.post("/common_getfactory", serverCommon.GetFactory);
router.post("/common_getfactoryissue", serverCommon.GetFactoryissue);
router.post("/common_getcostcenter", serverCommon.GetCostCenter);
router.post("/common_getcostcenterissue", serverCommon.GetCostCenterissue);
router.post("/common_getstatus", serverCommon.GetStatus);
router.post("/common_getusername", serverCommon.GetUserName);
router.post("/common_getmemberusername", serverCommon.GetMemberUserName); 
router.post("/common_getuserlogin", serverCommon.GetUserLogin); 
router.post("/common_getkytsuggestionapprover", serverCommon.GetKytSuggesTionApprover);
router.post("/common_getrequester", serverCommon.GetRequester); 
router.post("/common_getroleuser", serverCommon.GetRoleUser); 
router.post("/common_getloginapprove", serverCommon.GetLoginApprove); 
router.post("/common_getforgotpassword", serverCommon.GetForgotPassword); 
router.post("/common_getjobtype", serverCommon.GetJobType); 




module.exports = router;
