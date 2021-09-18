// This project uses SendGrid as a email service
// but you can switch to any dedicated email service
// like Mailgun
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendMail(msg) {
  try {
    await sgMail.send(msg);
  } catch (e) {
    throw new Error(`Could not send email: ${e.message}`);
  }
}

export const CONFIG = {
  // TODO: Replace with the email you want to use to send email
  from: `noreply@${new URL(process.env.WEB_URI).host}`,
};
