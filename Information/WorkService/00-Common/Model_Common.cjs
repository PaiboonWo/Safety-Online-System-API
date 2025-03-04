const express = require("express");
const oracledb = require("oracledb");
const multer = require("multer");
const app = express();
const { ConnectPG_DB, DisconnectPG_DB, ConnectOracleDB ,DisconnectOracleDB} = require("../../Connection/Conect_database.cjs");
const path = require("path");
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
  console.log(userlogin, "userlogin")
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
    console.log("GetMemberusername", p_empid);
    const client = await ConnectPG_DB();
    query += `SELECT * from "CUSR".kyt_005_get_usernamemember('${p_empid}')`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    console.log("DATA SHOW GetMemberusername : ", result.rows)
    res.status(200).json(result.rows[0]);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetUserLogin = async function (req, res) {
  let query = "";
  try {
    const { p_emp_id , p_status_check } = req.body;
    console.log("GetUserLogin", p_emp_id,p_status_check);
    const client = await ConnectPG_DB();
    query += `SELECT * from "CUSR".safety_all_001_comm_get_userlogin('${p_emp_id}','${p_status_check}')`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    console.log("DATA SHOW safety_all_001_comm_get_userlogin : ", result.rows)
    res.status(200).json(result.rows);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};


module.exports.GetKytSuggesTionApprover = async function (req, res) {
  var query = "";
  try {
    const { p_factory, p_costcenter } = req.body;
    console.log("GetKytSuggesTionApprover", p_factory, p_costcenter);
    const client = await ConnectOracleDB("QAD");
    query += `
          select t.spm_user_login as app_user,'['||t.spm_emp_id||'] '||m.user_fname||' '|| m.user_surname as app_name
          from HR.sg_person_master t,CUSR.cu_user_m m
          where t.spm_user_login = m.user_login 
              and  t.spm_level = 'PLV001' and t.spm_person_sts = 'A'
              and t.spm_factory = '${p_factory}'
              and t.spm_costcenter = '${p_costcenter}'
          order by m.user_fname
      `;
    const result = await client.execute(query);
    console.log("Data kyt_get_kytsuggestionApprover", result.rows);
    res.status(200).json(result.rows);
    DisconnectOracleDB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
// SELECT "CUSR".kyt_005_get_usernamemember(:p_empid);

module.exports.GetRequester = async function (req, res) {
  let query = "";
  try {
    const { struserlogin } = req.body;
    console.log("kyt_requester", struserlogin);
    const client = await ConnectPG_DB();
    query += `SELECT * FROM "CUSR".wkp_000_get_requester('${struserlogin}')`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    console.log("DATA SHOW kyt_000_get_userlogin : ", result.rows)
    res.status(200).json(result.rows);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetRoleUser = async function (req, res) {
  let query = "";
  try {
    const { p_emp_id } = req.body;
    console.log("GetRoleUser", p_emp_id);
    const client = await ConnectPG_DB();
    query += `SELECT * from "CUSR".safety_all_002_comm_get_role_user('${p_emp_id}')`;
    const result = await client.query(query);
    const filteredResult = result.rows.map((row) => row.response);
    await DisconnectPG_DB(client);
    console.log("DATA SHOW safety_all_002_comm_get_role_user : ", filteredResult)
    res.status(200).json(filteredResult);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetLoginApprove = async function (req, res) {
  let query = "";
  try {
    const { p_userlogin , p_password  } = req.body;
    console.log("GetLoginApprove", p_userlogin,p_password);
    const client = await ConnectPG_DB();
    query += `SELECT * from "CUSR".safety_all_003_comm_get_login_approve('${p_userlogin}','${p_password}')`;
    const result = await client.query(query);
    const filteredResult = result.rows.map((row) => row.response);
    await DisconnectPG_DB(client);
    console.log("DATA SHOW safety_all_003_comm_get_login_approve : ", filteredResult)
    res.status(200).json(filteredResult);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};


module.exports.GetForgotPassword = async function (req, res) {
  let query = "";
  try {
    const { p_userlogin , p_email  } = req.body;
    console.log("GetForgotPassword", p_userlogin,p_email);
    const client = await ConnectPG_DB();
    query += `SELECT * from "CUSR".safety_all_004_comm_get_forgotpassword('${p_userlogin}','${p_email}')`;
    const result = await client.query(query);
    const filteredResult = result.rows.map((row) => row.response);
    await DisconnectPG_DB(client);
    console.log("DATA SHOW safety_all_004_comm_get_forgotpassword : ", filteredResult)
    res.status(200).json(filteredResult);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};