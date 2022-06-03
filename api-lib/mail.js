// This project uses the nodemailer library to send email
// However, it is recommended to switch over to dedicated email services
// like Mailgun, AWS SES, etc.
import nodemailer from 'nodemailer';

const nodemailerConfig = process.env.SMTP_USER
  ? {
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  }
  : {};

const transporter = nodemailer.createTransport(nodemailerConfig);

export async function sendMail({ from, to, subject, html }) {
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Could not send email: ${e.message}`);
  }
}

export const CONFIG = {
  // TODO: Replace with the email you want to use to send email
  from: nodemailerConfig?.auth?.user,
};
