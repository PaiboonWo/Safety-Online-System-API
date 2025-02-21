const express = require("express");
const router = express.Router();
const serverTransaction = require("../../WorkService/03-FIIF-System/Model_Transection.cjs");

router.post("/trans_getrunningdocno", serverTransaction.Trans_GetrunningDocNo);
router.post("/trans_getfiiftype", serverTransaction.Trans_GetFIIFType);
router.post("/trans_deleteissuefiifrecord", serverTransaction.Trans_DeleteIssueFIIFRecord);


module.exports = router;