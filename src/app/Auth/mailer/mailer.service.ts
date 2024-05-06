// mailer.service.ts

import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as dotenv from "dotenv";

export interface EnvConfig {
  [prop: string]: string;
}

@Injectable()
export class MyMailerService {
  private transporter: nodemailer.Mailer;
  private from: string;
  private readonly envConfig: EnvConfig;
  constructor() {
    if (fs.existsSync('.env')) {
      this.envConfig = dotenv.parse(fs.readFileSync('.env'));
    }
    this.envConfig = this.envConfig ? this.envConfig : process.env;
    const mailerConfig = this.mailerConfig();
    this.transporter = nodemailer.createTransport(mailerConfig.connectionUrl);
    this.from = `"${mailerConfig.senderName}" ${mailerConfig.senderEmail}`;

    
    
  }

  async sendForgotPasswordEmail(email: string, resetToken: string): Promise<void> {
    try {
      await this.sendMail({
        to: email,
        subject: 'Password Reset Request',
        html: `
          <p>Hello!</p>
          <p>We have received a request to reset your password. If this was not you, please ignore this email.</p>
          <p>To reset your password, click the link below:</p>
          <a href="http://your-frontend-app/reset-password?token=${resetToken}">Reset Password</a>
          <p>If you did not request a password reset, no further action is required.</p>
          <p>Regards,</p>
          <p>Hamza Issaoui</p>
        `,
      });
    } catch (error) {
      // Handle error
      console.error('Error sending email:', error);
    }
  }

  async sendMail(mailOptions): Promise<any> {
    mailOptions.from = this.from;
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          Logger.error(error.name + ' : ' + error.message, error.stack);
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }

  mailerConfig() {
    console.log(this.envConfig, "envconfig");
    
    return {
      senderEmail: this.envConfig.MAILER_SENDER_EMAIL,
      senderName: this.envConfig.MAILER_SENDER_NAME,
      connectionUrl: this.envConfig.MAILER_CONNECTION_URL,
      to: this.envConfig.MAILER_RECEIVER_TO_EMAIL,
    };
  }
}
