const { generateUserConfirmationEmail } = require("./emailTemplate");

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
    const { name, email, mobile, company, message } = JSON.parse(event.body);

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
    const emailContent = generateUserConfirmationEmail({ name });
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      });
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
