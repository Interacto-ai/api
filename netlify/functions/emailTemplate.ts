exports.generateUserConfirmationEmail = ({ name, mentorEmail, mentorName }) => ({
  subject: "🎓 You're booked for a 1-on-1 Mentor Call!",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8f9fc; color: #333;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <div style="padding: 30px;">
          <h2 style="color: #4f46e5;">Hi ${name}, 👋</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for booking a <strong>1-on-1 Interview Mentor Session</strong> with ${mentorName} <span style="color: #4f46e5;"><strong>Interacto</strong></span>.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Our expert will get in touch with you shortly. In the meantime, feel free to prepare your questions and keep your resume handy! 📝
            If you don't receive anything from mentors side, you can mail our mentor directly at - ${mentorEmail}
          </p>
          <hr style="margin: 20px 0;" />
          <p style="font-size: 14px; color: #555;">
            💡 Tip: Stay in a quiet space during the call and take notes — this is your moment to shine.
          </p>
          <p style="margin-top: 30px;">Cheers,</p>
          <p><strong>Team Interacto</strong></p>
        </div>
      </div>
    </div>
  `,
  text: `Hi ${name},

Thanks for booking a 1-on-1 Interview Mentor Session with Interacto.

Our expert will get in touch with you shortly. Feel free to prepare your questions and keep your resume ready!

Tip: Be in a quiet space and take notes — this is your moment to shine.

— Team Interacto`,
});


exports.generateMentorEmail = ({ name, email, mobile, company, message }) => ({
  subject: `📬 New 1-on-1 Mentor Request from ${name}`,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f3f4f6; color: #111;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.08);">
        <div style="padding: 30px;">
          <h2 style="color: #1e40af;">📞 New 1-on-1 Interview Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Company / College:</strong> ${company}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 4px solid #6366f1; padding-left: 10px; color: #4b5563;">${message}</blockquote>
          <hr style="margin: 20px 0;" />
          <p style="font-size: 14px; color: #6b7280;">Sent automatically via Interacto</p>
        </div>
      </div>
    </div>
  `,
  text: `
New 1-on-1 Interview Request

Name: ${name}
Email: ${email}
Mobile: ${mobile}
Company / College: ${company}
Message: ${message}

Sent via Interacto
`,
});
