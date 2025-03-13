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
require("dotenv").config();

module.exports.GetTransReqNo = async function (req, res) {
    let query = "";
    try {
        const { dataList } = req.body;
        const json_convertdata = JSON.stringify(dataList);
        console.log("mmm", dataList);
        const Checkdatareqno = `
       SELECT * from "GC".safety_wkp_002_trans_getrunningreqno('[${json_convertdata}]') 
      `;
        const client = await ConnectPG_DB();
        const result_Checkdatareqno = await client.query(Checkdatareqno);
        console.log(
            "result_Check_data_docno",
            result_Checkdatareqno.rows[0].runningnoresult
        );
        await DisconnectPG_DB(client);
        res.status(200).send(result_Checkdatareqno.rows[0].runningnoresult);
    } catch (error) {
        console.error("Error querying PostgreSQL:", error.message);
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
    }
};

module.exports.GetController = async function (req, res) {
    let query = "";
    try {
        const { strreqfactory } = req.body;
        console.log("kyt_requester", strreqfactory);
        const client = await ConnectPG_DB();
        query += `SELECT * FROM "CUSR".wkp_003_get_controller('${strreqfactory}')`;
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        console.log("DATA SHOW wkp_003_get_controller : ", result.rows)
        res.status(200).json(result.rows);
    } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
    }
};


module.exports.GetApp1by = async function (req, res) {
    try {
        const getApp1by = `SELECT "CUSR".wkp_002_get_app1()`;
        const client = await ConnectPG_DB();
        const result_getApp1by = await client.query(getApp1by);
        await DisconnectPG_DB(client);
        const jsonData = result_getApp1by.rows.map((row) => {
            const rawData = row.wkp_002_get_app1.replace(/^\((.*)\)$/, "$1");
            const values = rawData.split(",").map((value) => value.replace(/"/g, ""));
            return {
                APP1_BY: values[0],
            };
        });
        res.status(200).json(jsonData);
        console.log(jsonData, "jsonData App1");
    } catch (error) {
        console.error("Error querying PostgreSQL ::", error.message);
        res
            .status(500)
            .json({ error: "An error occurred while querying the database." });
    }
};

module.exports.GetApp2by = async function (req, res) {
    try {
        const getApp2by = `SELECT "CUSR".wkp_002_get_app2()`;
        const client = await ConnectPG_DB();
        const result_getApp2by = await client.query(getApp2by);
        await DisconnectPG_DB(client);
        const jsonData = result_getApp2by.rows.map((row) => {
            const rawData = row.wkp_002_get_app2.replace(/^\((.*)\)$/, "$1");
            const values = rawData.split(",").map((value) => value.replace(/"/g, ""));
            return {
                APP2_BY: values[0],
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

module.exports.GetApp4by = async function (req, res) {
    try {
        const getApp4by = `SELECT "CUSR".wkp_002_get_app4()`;
        const client = await ConnectPG_DB();
        const result_getApp4by = await client.query(getApp4by);
        await DisconnectPG_DB(client);
        const jsonData = result_getApp4by.rows.map((row) => {
            const rawData = row.wkp_002_get_app4.replace(/^\((.*)\)$/, "$1");
            const values = rawData.split(",").map((value) => value.replace(/"/g, ""));
            return {
                APP4_BY: values[0],
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

module.exports.InsupdIssueWKPRecord = async function (req, res) {
    var query = "";
    try {
        const { dataList } = req.body;
        const json_convertdata = JSON.stringify(dataList);
        console.log("insupdissuewkprecord", json_convertdata);
        const client = await ConnectPG_DB();
        query += `CALL "GC".safety_wkp_003_trans_insupd_issuewkprecord('[${json_convertdata}]','')`;
        console.log(query)
        const result = await client.query(query);
        // console.log(
        //     "DATA SHOW safety_wkp_003_trans_insupd_issuewkprecord : ",
        //     result.rows
        // );
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
            DisconnectPG_DB(client);
        }
    } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
    }
};

module.exports.GeteditIssueWKPRecord = async function (req, res) {
    var query = "";
    try {
        const client = await ConnectPG_DB();
        const { dataList } = req.body;
        const json_convertdata = JSON.stringify(dataList);
        //console.log("GetEditIssuekytRecord", json_convertdata);
        query += `SELECT * from "GC".safety_wkp_004_trans_geteditissuewkprecord('[${json_convertdata}]')`;
        const result = await client.query(query);
        const filteredResult = result.rows.map((row) => row.response);
        res.status(200).json(filteredResult);
        DisconnectPG_DB(client);
    } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
    }
};

module.exports.GeteditIssueWKPPurpose = async function (req, res) {
    var query = "";
    try {
        const client = await ConnectPG_DB();
        const { dataList } = req.body;
        const json_convertdata = JSON.stringify(dataList);
        //console.log("GetEditIssuekytRecord", json_convertdata);
        query += `SELECT * from "GC".safety_wkp_004_trans_geteditissuewkppurpose('[${json_convertdata}]')`;
        const result = await client.query(query);
        const filteredResult = result.rows.map((row) => row.response);
        res.status(200).json(filteredResult);
        DisconnectPG_DB(client);
    } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
    }
};

module.exports.GeteditIssueWKPRequire = async function (req, res) {
    var query = "";
    try {
        const client = await ConnectPG_DB();
        const { dataList } = req.body;
        const json_convertdata = JSON.stringify(dataList);
        //console.log("GetEditIssuekytRecord", json_convertdata);
        query += `SELECT * from "GC".safety_wkp_004_trans_geteditissuewkprequire('[${json_convertdata}]')`;
        const result = await client.query(query);
        const filteredResult = result.rows.map((row) => row.response);
        res.status(200).json(filteredResult);
        DisconnectPG_DB(client);
    } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
    }
};

module.exports.GeteditIssueWKPTasktype = async function (req, res) {
    var query = "";
    try {
        const client = await ConnectPG_DB();
        const { dataList } = req.body;
        const json_convertdata = JSON.stringify(dataList);
        //console.log("GetEditIssuekytRecord", json_convertdata);
        query += `SELECT * from "GC".safety_wkp_004_trans_geteditissuewkptasktype('[${json_convertdata}]')`;
        const result = await client.query(query);
        const filteredResult = result.rows.map((row) => row.response);
        res.status(200).json(filteredResult);
        DisconnectPG_DB(client);
    } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
    }
};

module.exports.GeteditIssueWKPItem = async function (req, res) {
    var query = "";
    try {
        const client = await ConnectPG_DB();
        const { dataList } = req.body;
        const json_convertdata = JSON.stringify(dataList);
        //console.log("GetEditIssuekytRecord", json_convertdata);
        query += `SELECT * from "GC".safety_wkp_004_trans_geteditissuewkpitem('[${json_convertdata}]')`;
        const result = await client.query(query);
        const filteredResult = result.rows.map((row) => row.response);
        res.status(200).json(filteredResult);
        DisconnectPG_DB(client);
    } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
    }
};