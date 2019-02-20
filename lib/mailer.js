const nodemailer = require("nodemailer");
const config = require("../config.json");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.your_email,
    pass: config.your_pwd
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = {
  sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject) => {
      transport.sendMail({ from, subject, to, html }, (err, info) => {
        if (err) reject(err);
        resolve(info);
      });
    });
  }
};
