const express = require("express");
const router = express.Router();
const serverTransaction = require("../../WorkService/02-KYT-System/Model_Transection.cjs");

router.post("/trans_gettransissuesearch", serverTransaction.GetTransIssueSearch);
router.post("/trans_gettransdocno", serverTransaction.GetTransDocNo);
router.post("/trans_getkytsuggestionapprover", serverTransaction.GetKytSuggesTionApprover);
router.post("/insupd_trans_insupdtransissuekytrecord", serverTransaction.InsUpdTransIssuekytRecord);
router.post("/trans_geteditissuekytrecord", serverTransaction.GetEditIssuekytRecord);
router.post("/insupd_trans_insupdtransissuekytmember", serverTransaction.InsUpdTransIssuekytMember);
router.post("/insupd_trans_deletransissuekytmember", serverTransaction.DeleTransIssuekytMember);
router.post("/insupd_trans_gettranseditissuekytmember", serverTransaction.GetTransEditIssuekytMember);
router.post("/insupd_trans_insupdtransissuekytdangerousnumbers", serverTransaction.InsUpdTransIssueKytDangerOusNumbers);
router.post("/insupd_trans_gettranseditissuekytdangerousnumbers", serverTransaction.GetTransEditIssueKytDangerOusNumbers);
router.post("/insupd_trans_deletransissuekytdangerousnumbers", serverTransaction.DeleTransIssueKytDangerOusNumbers);
router.post("/insupd_trans_insupdtransissuekytcorrectivenumbers", serverTransaction.InsUpdTransIssueKytCorrecTiveNumbers);
router.post("/insupd_trans_deletransissuekytcorrectivenumbers", serverTransaction.DeleTransIssueKytCorrecTiveNumbers);
router.post("/insupd_trans_gettranseditissuekytcorrectivenumbers", serverTransaction.GetTransEditIssueKytCorrecTiveNumbers);


module.exports = router;