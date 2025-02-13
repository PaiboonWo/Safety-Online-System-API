const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// กำหนดค่า SMTP Config
const smtpConfig = {
  host: "10.17.220.200",
  port: 25,
  secure: false,
  auth: {
    user: "KYT@th.fujikura.com",
    pass: "",
  },
};

// สร้าง transporter
const transporter = nodemailer.createTransport(smtpConfig);

// สร้าง API ส่ง Email
router.post("/IssueandApproveEmail", async (req, res) => {
  try {
    const mailOptions = {
      from: "KYT@th.fujikura.com",
      to: req.body.toEmail,
      subject: req.body.subject,
      html: req.body.emailMessage,
    };

    console.log("Email Sended", req.body.toEmail, req.body.subject);
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email $$$$$$ :", error);
    res.status(500).json({ error: "An error occurred while sending email" });
  }
});

// ส่ง router ออกไปใช้งาน
module.exports = router;
