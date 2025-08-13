import nodemailer from "nodemailer";

const { generateUserConfirmationEmail } = require("./emailTemplate");
const { generateMentorEmail } = require("./emailTemplate");

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: 'Preflight' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, mobile, company, message, mentorName, mentorEmail } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let adminEmailStatus = 'not sent';
    let userEmailStatus = 'not sent';

    // Try sending to admin/mentor
    const emailContent = generateUserConfirmationEmail({ name, mentorEmail, mentorName });
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      });
      userEmailStatus = 'sent';
    } catch (adminErr) {
      console.error('User email failed:', adminErr);
    }

    try {
      const emailContent = generateMentorEmail({ name, email, mobile, company, message });
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: mentorEmail,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      });

      console.log("Mail sent successfully ")
      adminEmailStatus = 'sent';
    } catch (adminErr) {
      console.error('Admin email failed:', adminErr);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (err) {
    console.error('Unexpected error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Unexpected failure', error: err.message }),
    };
  }
};
