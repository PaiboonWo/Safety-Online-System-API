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
const fs = require("fs");
require("dotenv").config();



module.exports.Trans_GetrunningDocNo = async function (req, res) {
  let query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("Trans_GetrunningDocNo", dataList);
    const Check_data_docno = `
     SELECT * from "GC".safety_fiif_002_trans_getrunningdocno('[${json_convertdata}]') 
    `;
    const client = await ConnectPG_DB();
    const result_Check_data_docno = await client.query(Check_data_docno);
    console.log(
      "safety_fiif_002_trans_getrunningdocno",
      result_Check_data_docno.rows[0].runningnoresult
    );
    await DisconnectPG_DB(client);
    res.status(200).send(result_Check_data_docno.rows[0].runningnoresult);
  } catch (error) {
    console.error("Error querying PostgreSQL:", error.message);
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};


module.exports.Trans_GetFIIFType = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    query += `SELECT * from "GC".safety_fiif_001_trans_getfiiftype()`;
    const result = await client.query(query);
    const filteredResult = result.rows.map((row) => row.response);
    console.log("safety_fiif_001_trans_getfiiftype", filteredResult);
    res.status(200).json(filteredResult);
    DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.Trans_DeleteIssueFIIFRecord = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("DeleTransIssueKytAll", json_convertdata);
    const client = await ConnectPG_DB();
    query += `CALL "GC".safety_fiif_004_trans_dele_issuefiifrecord('[${json_convertdata}]','')`;
    const result = await client.query(query);
    console.log("DATA SHOW safety_fiif_004_trans_dele_issuefiifrecord : ", result.rows);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
