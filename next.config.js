require('dotenv').config();

module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    DB_NAME: process.env.DB_NAME,
    WEB_URI: process.env.WEB_URI,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_TEMPLATEID_EMAILVERIFY: process.env.SENDGRID_TEMPLATEID_EMAILVERIFY,
    EMAIL_FROM: process.env.EMAIL_FROM,
  },
};
