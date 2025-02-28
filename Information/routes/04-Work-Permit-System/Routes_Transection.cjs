const express = require("express");
const router = express.Router();
const Transection = require("../../WorkService/04-Work-Permit-System/Model_Transection.cjs");

router.post("/gettransreqno", Transection.GetTransReqNo);
router.post("/getapp1by", Transection.GetApp1by);
router.post("/getapp2by", Transection.GetApp2by);
router.post("/getapp4by", Transection.GetApp4by);


module.exports = router;