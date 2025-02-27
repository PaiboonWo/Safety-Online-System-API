
const express = require("express");
const oracledb = require("oracledb");
const multer = require("multer");
const app = express();
const { ConnectPG_DB, DisconnectPG_DB, ConnectOracleDB ,DisconnectOracleDB} = require("../../Connection/Conect_database.cjs");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

module.exports.GetStatus = async function (req, res) {
    try {
      const get_status = `SELECT "GC".safety_kyt_001_comm_get_status()`;
      const client = await ConnectPG_DB();
      const result_get_status = await client.query(get_status);
      await DisconnectPG_DB(client);
      const jsonData = result_get_status.rows.map((row) => {
        const rawData = row.safety_kyt_001_comm_get_status.replace(/^\((.*)\)$/, "$1");
        const values = rawData.split(",").map((value) => value.replace(/"/g, ""));
        return {
          J_STATUS_CODE: values[0],
          J_STATUS_DESC: values[1],
        };
      });
      res.status(200).json(jsonData);
      console.log(jsonData, "jsonData");
    } catch (error) {
      console.error("Error querying PostgreSQL ::", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while querying the database." });
    }
  };
  