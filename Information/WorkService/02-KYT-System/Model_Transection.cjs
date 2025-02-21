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
    query += `SELECT * from "GC".kyt_001_trans_get_issue_approve_masterlist_search('[${json_convertdata}]')`;
    const result = await client.query(query);
    const filteredResult = result.rows.map((row) => row.response);
    console.log("kyt_001_trans_get_issue_approve_masterlist_search", filteredResult);
    res.status(200).json(filteredResult);
    DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};


module.exports.GetTransDocNo = async function (req, res) {
  let query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("Search_aoiandspi_rslt", dataList);
    const Check_data_docno = `
     SELECT * from "GC".kyt_001_trans_getrunningdocno('[${json_convertdata}]') 
    `;
    const client = await ConnectPG_DB();
    const result_Check_data_docno = await client.query(Check_data_docno);
    console.log(
      "result_Check_data_docno",
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

module.exports.InsUpdTransIssuekytRecord = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("InsUpdTransIssuekytRecord", json_convertdata);
    const client = await ConnectPG_DB();
    query += `CALL "GC".kyt_001_insupd_trans_issuekytrecord('[${json_convertdata}]','')`;
    const result = await client.query(query);
    console.log(
      "DATA SHOW kyt_001_insupd_trans_issuekytrecord : ",
      result.rows
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetEditIssuekytRecord = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("GetEditIssuekytRecord", json_convertdata);
    query += `SELECT * from "GC".kyt_001_trans_geteditissuekytrecord('[${json_convertdata}]')`;
    const result = await client.query(query);
    const filteredResult = result.rows.map((row) => row.response);
    res.status(200).json(filteredResult);
    DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.InsUpdTransIssuekytMember = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = dataList.map(JSON.stringify).join(",");
    console.log("InsUpdTransIssuekytMember", json_convertdata);
    const client = await ConnectPG_DB();
    query += `CALL "GC".kyt_001_insupd_trans_issuekytmember('[${json_convertdata}]','')`;
    const result = await client.query(query);
    console.log(
      "DATA SHOW kyt_001_insupd_trans_issuekytmember : ",
      result.rows
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.DeleTransIssuekytMember = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("DeleTransIssuekytMember", json_convertdata);
    const client = await ConnectPG_DB();
    query += `CALL "GC".kyt_001_dele_trans_issuekytmember('[${json_convertdata}]','')`;
    const result = await client.query(query);
    console.log("DATA SHOW kyt_001_dele_trans_issuekytmember : ", result.rows);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetTransEditIssuekytMember = async function (req, res) {
  let query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("GetTransEditIssuekytMember", dataList);
    const Check_data_docno = `
     SELECT * from "GC".kyt_001_trans_geteditissuekytmember('[${json_convertdata}]') 
    `;
    const client = await ConnectPG_DB();
    const result = await client.query(Check_data_docno);
    const filteredResult = result.rows.map((row) => row.response);
    console.log(" DATA kyt_001_trans_geteditissuekytmember", filteredResult);

    await DisconnectPG_DB(client);
    res.status(200).send(filteredResult);
  } catch (error) {
    console.error("Error querying PostgreSQL:", error.message);
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.InsUpdTransIssueKytDangerOusNumbers = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = dataList.map(JSON.stringify).join(",");
    console.log("InsUpdTransIssueKytDangerOusNumbers", json_convertdata);
    const client = await ConnectPG_DB();
    query += `CALL "GC".kyt_001_insupd_trans_issuekytdangerousnumbers('[${json_convertdata}]','')`;
    const result = await client.query(query);
    console.log(
      "DATA SHOW kyt_001_insupd_trans_issuekytdangerousnumbers : ",
      result.rows
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetTransEditIssueKytDangerOusNumbers = async function (
  req,
  res
) {
  let query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("GetTransEditIssueKytDangerOusNumbers", dataList);
    const Check_data_docno = `
     SELECT * from "GC".kyt_001_trans_geteditissuekytdangerousnumbers('[${json_convertdata}]') 
    `;
    const client = await ConnectPG_DB();
    const result = await client.query(Check_data_docno);
    const filteredResult = result.rows.map((row) => {
      const response = row.response;
      return {
        ...response,
        level: response.level === null ? "" : response.level, // Replace null with an empty string
      };
    });

    console.log(
      "DATA kyt_001_trans_geteditissuekytdangerousnumbers",
      filteredResult
    );

    await DisconnectPG_DB(client);
    res.status(200).send(filteredResult);
  } catch (error) {
    console.error("Error querying PostgreSQL:", error.message);
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.DeleTransIssueKytDangerOusNumbers = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("DeleTransIssueKytDangerOusNumbers", json_convertdata);
    const client = await ConnectPG_DB();
    query += `CALL "GC".kyt_001_dele_trans_issuekytdangerousnumbers('[${json_convertdata}]','')`;
    const result = await client.query(query);
    console.log(
      "DATA SHOW kyt_001_dele_trans_issuekytdangerousnumbers : ",
      result.rows
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.InsUpdTransIssueKytCorrecTiveNumbers = async function (
  req,
  res
) {
  var query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = dataList.map(JSON.stringify).join(",");
    console.log("InsUpdTransIssueKytCorrecTiveNumbers", json_convertdata);
    const client = await ConnectPG_DB();
    query += `CALL "GC".kyt_001_insupd_trans_issuekytcorrectivenumbers('[${json_convertdata}]','')`;
    const result = await client.query(query);
    console.log(
      "DATA SHOW kyt_001_insupd_trans_issuekytcorrectivenumbers : ",
      result.rows
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.DeleTransIssueKytCorrecTiveNumbers = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("DeleTransIssueKytCorrecTiveNumbers", json_convertdata);
    const client = await ConnectPG_DB();
    query += `CALL "GC".kyt_001_dele_trans_issuekytcorrectivenumbers('[${json_convertdata}]','')`;
    const result = await client.query(query);
    console.log(
      "DATA SHOW kyt_001_dele_trans_issuekytcorrectivenumbers : ",
      result.rows
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetTransEditIssueKytCorrecTiveNumbers = async function (
  req,
  res
) {
  let query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("GetTransEditIssueKytCorrecTiveNumbers", dataList);
    const Check_data_docno = `
     SELECT * from "GC".kyt_001_trans_geteditissuekytcorrectivenumbers('[${json_convertdata}]') 
    `;
    const client = await ConnectPG_DB();
    const result = await client.query(Check_data_docno);
    const filteredResult = result.rows.map((row) => {
      const response = row.response;
      return {
        ...response,
        select:
          response.select === null
            ? "" // ถ้าเป็น null ให้เป็นค่าว่าง
            : response.select === "Y"
            ? true // ถ้าเป็น "Y" ให้เปลี่ยนเป็น true
            : response.select, // ถ้าไม่ใช่ทั้ง null และ "Y" ก็ให้เก็บค่าเดิม
      };
    });

    console.log(
      "DATA kyt_001_trans_geteditissuekytcorrectivenumbers",
      filteredResult
    );

    await DisconnectPG_DB(client);
    res.status(200).send(filteredResult);
  } catch (error) {
    console.error("Error querying PostgreSQL:", error.message);
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.DeleTransIssueKytAll = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log("DeleTransIssueKytAll", json_convertdata);
    const client = await ConnectPG_DB();
    query += `CALL "GC".kyt_001_dele_trans_issuekytall('[${json_convertdata}]','')`;
    const result = await client.query(query);
    console.log("DATA SHOW kyt_001_dele_trans_issuekytall : ", result.rows);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

