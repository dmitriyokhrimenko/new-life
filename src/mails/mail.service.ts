import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import { createUserDto } from "../users/dto/create-user.dto";
import {
  Address,
  AttachmentLikeObject, Headers,
  TextEncoding
} from "@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  /**
   * Register by a email and password.
   * Returns the accessToken and refreshToken.
   *
   * @param email - user email
   * @param activationLink - activation link
   *
   * @returns
   * accessToken - access token
   * refreshToken - refresh token
   */
  async sendActivationMail(userDto: createUserDto, activationLink: string) {
    return await this.mailerService
      .sendMail({
        to: userDto.email,
        subject: 'Подтверждение регистрации',
        template: 'reg.ejs',
        context: {
          id: 2,
          username: userDto.firstName ?? null,
          urlConfirmAddress: activationLink,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Ошибка работы почты: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });
  }
}
