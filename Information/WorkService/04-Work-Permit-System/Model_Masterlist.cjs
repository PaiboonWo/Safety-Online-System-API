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

module.exports.GetStatus = async function (req, res) {
    try {
        const get_status = `SELECT "CUSR".wkp_001_get_status()`;
        const client = await ConnectPG_DB();
        const result_get_status = await client.query(get_status);
        await DisconnectPG_DB(client);
        const jsonData = result_get_status.rows.map((row) => {
            const rawData = row.wkp_001_get_status.replace(/^\((.*)\)$/, "$1");
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

module.exports.GetTransIssue_Approve_Masterlist_Search = async function (req, res) {
    var query = "";
    try {
        const client = await ConnectPG_DB();
        const { dataList } = req.body;
        const json_convertdata = JSON.stringify(dataList);
        console.log("GetTransIssue_Approve_Masterlist_Search", json_convertdata);
        query += `SELECT * from "GC".satety_wkp_001_mlist_getissue_approve_masterlist_search('[${json_convertdata}]')`;
        const result = await client.query(query);
        const filteredResult = result.rows.map((row) => row.response);
        console.log("wkp", filteredResult);
        res.status(200).json(filteredResult);
        DisconnectPG_DB(client);
    } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
    }
};