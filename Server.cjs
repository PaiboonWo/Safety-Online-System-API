const express = require("express");
const oracledb = require("oracledb");
const { Pool } = require("pg");
const app = express();
const port = 5101;
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
const Common_SendMail = require("./Information/send_email/00-Common/Send_Email.cjs");
const KYT_Transaction = require("./Information/routes/02-KYT-System/Routes_Transaction.cjs");
const KYT_DataEmail = require("./Information/routes/02-KYT-System/Routes_Dataemail.cjs");
const KYT_SendMail = require("./Information/send_email/02-KYT-System/Send_Email.cjs");
const KYT_Common = require("./Information/routes/02-KYT-System/Routes_Common.cjs");
const FIIF_Transaction = require("./Information/routes/03-FIIF-System/Routes_Transaction.cjs");
const FIIF_MasterList = require("./Information/routes/03-FIIF-System/Routes_MasterList.cjs");
const FIIF_DataEmail = require("./Information/routes/03-FIIF-System/Routes_Dataemail.cjs");
const FIIF_SendMail = require("./Information/send_email/03-FIIF-System/Send_Email.cjs");
const FIIF_Common = require("./Information/routes/03-FIIF-System/Routes_Common.cjs");
const FIIF_Report = require("./Information/routes/03-FIIF-System/Routes_Report.cjs");
const WKP_MasterList = require("./Information/routes/04-Work-Permit-System/Routes_Masterlist.cjs");
const WKP_Transaction = require("./Information/routes/04-Work-Permit-System/Routes_Transection.cjs");

// Common
app.use("/api/Common",Common);
app.use("/api/Common/common_sendemail",Common_SendMail);

// KYT System
app.use("/api/KYT_System/Transection", KYT_Transaction);
app.use("/api/KYT_System/DataEmail", KYT_DataEmail);
app.use("/api/KYT_System/SendEmail", KYT_SendMail);
app.use("/api/KYT_System/Common", KYT_Common);

// FIIF System
app.use("/api/FIIF_System/Transection", FIIF_Transaction);
app.use("/api/FIIF_System/MasterList", FIIF_MasterList);
app.use("/api/FIIF_System/DataEmail", FIIF_DataEmail);
app.use("/api/FIIF_System/SendEmail", FIIF_SendMail);
app.use("/api/FIIF_System/Common", FIIF_Common);
app.use("/api/FIIF_System/Report", FIIF_Report);


// Work Permit System
app.use("/api/WKP_System", WKP_MasterList);
app.use("/api/WKP_System/Tran", WKP_Transaction);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
