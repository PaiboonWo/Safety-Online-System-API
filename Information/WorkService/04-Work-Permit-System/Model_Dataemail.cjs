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
require("dotenv").config();

module.exports.GetIssueApproveData_Email = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { dataList } = req.body;
      const json_convertdata = JSON.stringify(dataList);
      query += `SELECT * from "GC".safety_wkp_007_trans_getissueapprove_sendemail('[${json_convertdata}]')`;
      const result = await client.query(query);
      const filteredResult = result.rows.map((row) => row.response);
      console.log("safety_wkp_007_trans_getissueapprove_sendemail", filteredResult);
      res.status(200).json(filteredResult);
      DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };