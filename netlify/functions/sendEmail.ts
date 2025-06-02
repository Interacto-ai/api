const emailjs = require('@emailjs/nodejs');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*', // Replace '*' with your actual domain for security
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    // Handle preflight request
    return {
      statusCode: 200,
      headers,
      body: 'Preflight check',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: 'Method Not Allowed',
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, mobile, company, message } = data;

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      { name, email, mobile, company, message },
      { publicKey: process.env.EMAILJS_PUBLIC_KEY }
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
    };
  }
};
