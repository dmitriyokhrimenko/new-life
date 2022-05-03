import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as path from 'path';

export const getMailConfig = async (
  configService: ConfigService,
): Promise<any> => {
  const transport = configService.get<string>('MAIL_TRANSPORT');
  const mailFromName = configService.get<string>('MAIL_FROM_NAME');
  const mailFromAddress = transport.split(':')[1].split('//')[1];

  return {
    transport: {
      host: process.env.SMTP_HOST,
      port: 587,
      ignoreTLS: false,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
    defaults: {
      from: `"${mailFromName}" <${mailFromAddress}>`,
    },
    template: {
      dir: path.join(__dirname, '../../mails/templates'),
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      },
    },
  };
};
