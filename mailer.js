"use strict";
const nodemailer = require("nodemailer");

async function main() {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'noreply.medication.reminder@gmail.com',
      pass: 'pRgNaENxGQxP',
    },
  });

  let info = await transporter.sendMail({
    from: '"Medication reminder" <noreply.medication.reminder@gmail.com>',
    to: "ivan.zabrodin@tamu.edu, pyrat32@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });
}

main().catch(console.error);