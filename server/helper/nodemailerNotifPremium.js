const nodemailer = require("nodemailer");

const sendEmailNotif = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_NODEMAILER,
        pass: process.env.PASSWORD_NODEMAILER,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_NODEMAILER,
      to: to,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmailNotif;