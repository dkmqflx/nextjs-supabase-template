'use server';

import nodemailer from 'nodemailer';

type EmailData = {
  from: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // 앱 비밀번호 사용
  },
});

export async function sendEmail({ from, subject, message }: EmailData) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error('Missing email configuration');
  }

  try {
    await transporter.sendMail({
      from,
      to: process.env.EMAIL_USER,
      subject: subject,
      html: `
        <h2>New message from FAQ form</h2>
        <p><strong>From:</strong> ${from}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
}
