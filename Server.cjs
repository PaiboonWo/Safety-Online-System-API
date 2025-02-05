

const express = require("express");
const oracledb = require("oracledb");
const { Pool } = require("pg");
const app = express();
const port = 5100;
const fs = require("fs");
const nodemailer = require('nodemailer');
const path = require("path");

require("dotenv").config();
const cors = require('cors');
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
    return res.sendStatus(200);  
  }
  next();
});

const Common = require("./Information/routes/Routes_Common.cjs");
const Transaction = require("./Information/routes/Routes_Transaction.cjs");

// Common
app.use("/api/Common", Common);
// Transection
app.use("/api/Transection", Transaction);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});