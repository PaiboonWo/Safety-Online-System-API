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

module.exports.Report_Get_Datareportall = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { dataList } = req.body;
      const json_convertdata = JSON.stringify(dataList);
      console.log("Report_Get_Datareportall", json_convertdata);
      query += `SELECT * from "GC".safety_fiif_001_report_get_datareportall('[${json_convertdata}]')`;
      const result = await client.query(query);
      
      // จัดเรียงข้อมูลตามลำดับที่ต้องการ
      const orderedResult = result.rows.map((row) => {
        const data = row.response;
        // กำหนดลำดับคีย์ที่ต้องการ
        return {
          date: data.date,
          code: data.code,
          name: data.name,
          cc: data.cc,
          ky1: data.ky1,
          ky2: data.ky2,
          ky3: data.ky3,
          type: data.type,
          cmmt: data.cmmt,
          sts: data.sts,
          job: data.job
        };
      });
      
      console.log("safety_fiif_001_report_get_datareportall", orderedResult);
      res.status(200).json(orderedResult);
      DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };