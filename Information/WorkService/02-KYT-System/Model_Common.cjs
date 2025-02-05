const express = require("express");
const oracledb = require("oracledb");
const multer = require("multer");
const app = express();
const { ConnectPG_DB, DisconnectPG_DB, ConnectOracleDB } = require("../../Connection/Conect_database.cjs");
const path = require("path");
// const uploadsPath = path.join(
//   "/PROJECT_REACT_WORK/MRG_FAA_PROJECT/DEPLOY/SERVICE_TEST_DEPLOY/MGR_FAA_SERVICE/FAA_service/UploadFileImage"
// );
const fs = require("fs");
require("dotenv").config();

module.exports.GetFactory = async function (req, res) {
  try {
    const get_factory = `SELECT "CUSR".kyt_001_get_factory()`;
    const client = await ConnectPG_DB();
    const result_get_factory = await client.query(get_factory);
    await DisconnectPG_DB(client);
    const jsonData = result_get_factory.rows.map((row) => {
      const rawData = row.kyt_001_get_factory.replace(/^\((.*)\)$/, "$1");
      const values = rawData.split(",").map((value) => value.replace(/"/g, ""));
      return {
        J_FACTORY_CODE: values[0],
        J_FACTORY_DESC: values[1],
      };
    });
    res.status(200).json(jsonData);
    console.log(jsonData, "jsonData Factory");
  } catch (error) {
    console.error("Error querying PostgreSQL ::", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while querying the database." });
  }
};

module.exports.GetCostCenter = async function (req, res) {
  try {
    const get_costcenter = `SELECT "CUSR".kyt_002_get_costcenter()`;
    const client = await ConnectPG_DB();
    const result_get_costcenter = await client.query(get_costcenter);
    await DisconnectPG_DB(client);
    const jsonData = result_get_costcenter.rows.map((row) => {
      const rawData = row.kyt_002_get_costcenter.replace(/^\((.*)\)$/, "$1");
      const values = rawData.split(",").map((value) => value.replace(/"/g, ""));
      return {
        J_COSTCENTER_CODE: values[0],
      };
    });
    res.status(200).json(jsonData);
    console.log(jsonData, "jsonData Costcenter");
  } catch (error) {
    console.error("Error querying PostgreSQL ::", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while querying the database." });
  }
};

module.exports.GetStatus = async function (req, res) {
  try {
    const get_status = `SELECT "CUSR".kyt_003_get_status()`;
    const client = await ConnectPG_DB();
    const result_get_status = await client.query(get_status);
    await DisconnectPG_DB(client);
    const jsonData = result_get_status.rows.map((row) => {
      const rawData = row.kyt_003_get_status.replace(/^\((.*)\)$/, "$1");
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


module.exports.GetUserName = async function (req, res) {
  const { userlogin } = req.body;
  console.log(userlogin,"userlogin")
  try {
    const get_username = `SELECT "CUSR".kyt_004_get_username($1)`;
    const client = await ConnectPG_DB();
    const result_get_username = await client.query(get_username, [userlogin]); 
    await DisconnectPG_DB(client);
    console.log(result_get_username.rows, "ผลลัพธ์จากฐานข้อมูล");

   
    const jsonData = result_get_username.rows.map((row) => {
      const rawData = row.kyt_004_get_username.replace(/^\((.*)\)$/, "$1");
      const values = rawData.split(",").map((value) => value.replace(/"/g, ""));
      return {
        J_USERLOGIN: values[0],
        J_USERNAME: values[1],
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


module.exports.GetMemberUserName = async function (req, res) {
  let query = "";
  try {
    const { p_empid } = req.body;
    console.log("GetMemberusername",p_empid);
    const client = await ConnectPG_DB();
    query += `SELECT * from "CUSR".kyt_005_get_usernamemember('${p_empid}')`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    console.log("DATA SHOW GetMemberusername : ",result.rows)
    res.status(200).json(result.rows[0]);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetUserLogin = async function (req, res) {
  let query = "";
  try {
    const { p_userlogin } = req.body;
    console.log("kyt_GetUserLogin",p_userlogin);
    const client = await ConnectPG_DB();
    query += `SELECT * from "CUSR".kyt_000_get_userlogin('${p_userlogin}')`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    console.log("DATA SHOW kyt_000_get_userlogin : ",result.rows)
    res.status(200).json(result.rows[0]);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};


// SELECT "CUSR".kyt_005_get_usernamemember(:p_empid);



