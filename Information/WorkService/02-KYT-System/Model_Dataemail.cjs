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

module.exports.Get_Issue_Approve_Data_Email = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("Get_Issue_Approve_Send_Email", json_convertdata);
    query += `SELECT * from "GC".kyt_001_trans_get_issue_approve_send_email('[${json_convertdata}]')`;
    const result = await client.query(query);
    const filteredResult = result.rows.map((row) => row.response);
    console.log("kyt_001_trans_get_issue_approve_send_email", filteredResult);
    res.status(200).json(filteredResult);
    DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
