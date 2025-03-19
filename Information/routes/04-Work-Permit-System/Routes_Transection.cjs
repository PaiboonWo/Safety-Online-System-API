const express = require("express");
const router = express.Router();
const Transection = require("../../WorkService/04-Work-Permit-System/Model_Transection.cjs");

router.post("/gettransreqno", Transection.GetTransReqNo);
router.post("/getapp1by", Transection.GetApprove1By);
router.post("/getapp2by", Transection.GetApprove2By);
router.post("/getapp4by", Transection.GetApprove4By);
router.post("/getcontroller", Transection.GetController);
router.post("/insupdtransissuekwp", Transection.InsupdIssueWKPRecord);
router.post("/geteditissuewkprecord", Transection.GeteditIssueWKPRecord);
router.post("/geteditissuewkppurpose", Transection.GeteditIssueWKPPurpose);
router.post("/geteditissuewkprequire", Transection.GeteditIssueWKPRequire);
router.post("/geteditissuewkptasktype", Transection.GeteditIssueWKPTasktype);
router.post("/geteditissuewkpitem", Transection.GeteditIssueWKPItem);
router.post("/deletetransissuewkpall", Transection.DeleTransIssueWKPAll);

module.exports = router;