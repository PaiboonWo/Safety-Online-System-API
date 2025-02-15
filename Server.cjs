const express = require("express");
const oracledb = require("oracledb");
const { Pool } = require("pg");
const app = express();
const port = 5100;
const fs = require("fs");
const nodemailer = require("nodemailer");
const path = require("path");

require("dotenv").config();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.use(express.json());
app.use(express.json({ limit: '50mb' }));  // เพิ่มขนาดสูงสุดเป็น 50MB
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const Common = require("./Information/routes/00-Common/Routes_Common.cjs");
const KYT_Transaction = require("./Information/routes/02-KYT-System/Routes_Transaction.cjs");
const KYT_DataEmail = require("./Information/routes/02-KYT-System/Routes_Dataemail.cjs");
const KYT_SendMail = require("./Information/send_email/02-KYT-System/Send_Email.cjs");
const FIIF_Transaction = require("./Information/routes/03-FIIF-System/Routes_Transaction.cjs");

// Common
app.use("/api/Common",Common);

// KYT System
app.use("/api/KYT_System/Transection", KYT_Transaction);
app.use("/api/KYT_System/DataEmail", KYT_DataEmail);
app.use("/api/KYT_System/SendEmail", KYT_SendMail);

// FIIF System
app.use("/api/FIIF_System/Transection", FIIF_Transaction);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
