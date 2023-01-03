// Packages
import { createTransport } from 'nodemailer';
import { google } from 'googleapis';
const ejs = require('ejs');
const {resolve} = require('path');
// Configs
import config from '../config/config';
const {S3_TEMPLATE_PATH} = require('./../constants/constants')

const defaultConfig = config

// Utils
import catchAsync from './catchAsync';
import AppError from './appError';
import { REFUSED } from 'dns';

/**
 * @desc    Send an email
 * @param   { String } to - Send to
 * @param   { String } subject - Mail subject
 * @param   { String } text - Mail body
 * @returns { Promise }
 */
const sendEmail = catchAsync(async (to, subject, text) => {
  
  const OAuth2Client = new google.auth.OAuth2(
    defaultConfig.email.client.id,
    defaultConfig.email.client.secret,
    defaultConfig.email.RedirectUri
  );

  OAuth2Client.setCredentials({ refresh_token: defaultConfig.email.RefreshToken });

  try {

    // Generate the accessToken on the fly
    const accessToken = await OAuth2Client.getAccessToken();

    // Create the email envelope (transport)
    const transport = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: defaultConfig.email.from,
        clientId: defaultConfig.email.client.id,
        clientSecret: defaultConfig.email.client.secret,
        refreshToken: defaultConfig.email.RefreshToken,
        accessToken: accessToken
      }
    });

    // Create the email options and body
    const mailOptions = {
      from: `eCart < ${defaultConfig.email.from} >`,
      to,
      subject,
      html:text
    };

    // Set up the email options and delivering it
    return await transport.sendMail(mailOptions);
  } catch (error) {
    return new AppError(error, 500);
  }
});

/**
 * @desc    Send reset password email
 * @param   { String } to - Mail to
 * @param   { String } token - Reset password token
 * @returns { Promise }
 */
export const sendResetPasswordEmail = catchAsync(async (to, token) => {
  const subject = 'Reset password';
  const resetPasswordUrl = `/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;

  await sendEmail(to, subject, text);
});

/**
 * @desc    Send After Reset Password email
 * @param   { String } to - Mail to
 * @returns { Promise }
 */
export const sendAfterResetPasswordMessage = catchAsync(async (to) => {
  const subject = 'Password Reset Successfully';
  const text = `Your password has successfully been reset.
  Do not hesitate to contact us if you have any questions.`;

  await sendEmail(to, subject, text);
});

/**
 * @desc    Send verification email
 * @param   { String } to - Mail to
 * @param   { String } token - Verify token
 * @returns { Promise }
 */
export const sendVerificationEmail = catchAsync(async (to, token) => {
  
  const subject = 'Email Verification';
  const verificationEmailUrl = defaultConfig.web_url+`verify-email?token=${token}`;

    const absolutePath = __dirname + '/views/emails/welcome.ejs';
    ejs.renderFile(absolutePath, { to, verificationLink:verificationEmailUrl, bucketPath: S3_TEMPLATE_PATH }, async(err, data) => {
      if (err) {
        console.log('============Email EJS Issue =====================',err);
      } else {

        await sendEmail(to, subject, data);
      }
    });

});
