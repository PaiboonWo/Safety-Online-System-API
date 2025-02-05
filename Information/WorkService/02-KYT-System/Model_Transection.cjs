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

module.exports.GetTransIssueSearch = async function (req, res) {
  const { fac, cc, date_f, date_t, user, status, topic } = req.body;
  console.log(fac, cc, date_f, date_t, user, status, topic, "แสดง");
  try {
    const jsonPayload = JSON.stringify({
      fac,
      cc,
      date_f: date_f ? date_f : null,
      date_t: date_t ? date_t : null,
      user,
      status,
      topic,
    });
    const get_issue_search = `SELECT "GC".kty_001_trans_issue_search($1)`;
    const client = await ConnectPG_DB();
    const result_get_issue_search = await client.query(get_issue_search, [
      jsonPayload,
    ]);
    await DisconnectPG_DB(client);
    console.log(result_get_issue_search.rows, "ผลลัพธ์จากฐานข้อมูล");

    // if (result_get_issue_search.rows.length === 0) {
    //   return res.status(404).json({ message: "No data found." });
    // }

    const jsonData = result_get_issue_search.rows.map((row) => {
      const rawData = row.kty_001_trans_issue_search.replace(
        /^\((.*)\)$/,
        "$1"
      );
      const values = rawData.split(",").map((value) => value.replace(/"/g, ""));
      return {
        // J_FACTORY: values[0],
        J_FACTORY_DESC: values[1],
        J_COST_CENTER: values[2],
        J_ISSUE_NO: values[3],
        // J_ISSUE_DATE: values[4],
        J_ISSUE_DATE_C: values[5],
        // J_ISSUE_BY: values[6],
        J_ISSUE_BY_C: values[7],
        J_TOPIC: values[8],
        // J_APPROVE_BY: values[9],
        J_APPROVE_BY_C: values[10],
        // J_APPROVE_DATE: values[11],
        J_APPROVE_DATE_C: values[12],
        // J_STATUS: values[13],
        J_STATUS_DESC: values[14],
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
    console.log(
      " DATA kyt_001_trans_geteditissuekytmember",
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



module.exports.GetTransEditIssueKytDangerOusNumbers = async function (req, res) {
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
    console.log("DATA SHOW kyt_001_dele_trans_issuekytdangerousnumbers : ", result.rows);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.InsUpdTransIssueKytCorrecTiveNumbers = async function (req, res) {
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
    console.log("DATA SHOW kyt_001_dele_trans_issuekytcorrectivenumbers : ", result.rows);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};


module.exports.GetTransEditIssueKytCorrecTiveNumbers = async function (req, res) {
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
        select: response.select === null 
          ? ""  // ถ้าเป็น null ให้เป็นค่าว่าง
          : response.select === "Y"
            ? true  // ถ้าเป็น "Y" ให้เปลี่ยนเป็น true
            : response.select,  // ถ้าไม่ใช่ทั้ง null และ "Y" ก็ให้เก็บค่าเดิม
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