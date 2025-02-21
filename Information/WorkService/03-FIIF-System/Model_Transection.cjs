const express = require("express");
const multer = require("multer");
const app = express();
const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../../Connection/Conect_database.cjs");
const { writeLogError } = require("../../Common/LogFunction.cjs");
const path = require("path");
// const uploadsPath = path.join(
//   "/PROJECT_REACT_WORK/MRG_FAA_PROJECT/DEPLOY/SERVICE_TEST_DEPLOY/MGR_FAA_SERVICE/FAA_service/UploadFileImage"
// );
const fs = require("fs");
require("dotenv").config();

module.exports.GetTransIssue_Approve_Masterlist_Search = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("GetTransIssue_Approve_Masterlist_Search", json_convertdata);
    query += `SELECT * from "GC".safety_fiif_002_trans_get_issue_approve_masterlist_search('[${json_convertdata}]')`;
    const result = await client.query(query);
    const filteredResult = result.rows.map((row) => row.response);
    console.log("safety_fiif_002_trans_get_issue_approve_masterlist_search", filteredResult);
    res.status(200).json(filteredResult);
    DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};