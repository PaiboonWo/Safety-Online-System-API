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