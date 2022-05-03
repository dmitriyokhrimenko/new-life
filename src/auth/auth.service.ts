import {
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokenService } from './token.service';
import * as bcrypt from 'bcrypt';
import { createUserDto } from '../users/dto/create-user.dto';
import { User } from '../db/entities/users.entity';
import { v4 as uuidV4 } from 'uuid';
import { MailService } from '../mails/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private mailService: MailService,
  ) {}

  /**
   * Register by a email and password.
   * Returns the accessToken and refreshToken.
   *
   *
   * @param userDto - user object retrieved from DB storage
   * @returns
   * accessToken - access token
   * refreshToken - refresh token
   */
  async register(userDto: createUserDto) {
    const candidate = await this.usersService.findByEmail(userDto.email);
    if (candidate) {
      return HttpException.createBody({
        message: `User with email ${userDto.email} already registered`,
      });
    }
    const hashPass = await bcrypt.hash(userDto.password, 12);
    const activationLink = `${process.env.APP_URL}:${
      process.env.APP_PORT
    }/confirm-email/${uuidV4()}`;
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPass,
    });
    this.mailService.sendActivationMail(userDto, activationLink).then((res) => {
      console.log(`Success!!!`);
    });
    const payload = { email: user.email };
    const tokens = await this.tokenService.generateTokens(payload);
    return {
      ...tokens,
      user: {
        ...new User(user),
      },
    };
  }

  /**
   * Login by a email and password.
   * Returns the accessToken and refreshToken.
   *
   *
   * @param userDto - DTO's user object retrieved from DB storage
   * @returns
   * accessToken - access token
   * refreshToken - refresh token
   */
  async login(userDto: createUserDto) {
    Logger.log('get request /login', 'AuthController');
    const user = await this.usersService.findByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: `User with email ${userDto.email} not found`,
      });
    }
    const isPassEquals = await bcrypt.compare(userDto.password, user.password);
    if (!isPassEquals) {
      throw new UnauthorizedException({
        message: `Invalid password`,
      });
    }
    const payload = { email: user.email };
    const tokens = await this.tokenService.generateTokens(payload);
    return {
      user,
      ...tokens,
    };
  }

  /**
   * Send verification code to the user
   * Returns verification code.
   *
   *
   * @param user - user object retrieved from DB storage
   * @returns
   * accessToken - verification code
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async forgotPassword(user: any) {
    //TODO: sending verification code to user

    //TODO: move to helper
    const max = 1000000;
    const min = 100000;
    const verificationCode = Math.floor(Math.random() * (max - min + 1)) + min;

    return {
      verificationCode,
    };
  }

  /**
   * Send verification code to the user
   * Returns verification code.
   *
   *
   * @param user - user object retrieved from DB storage
   * @returns
   * accessToken - verification code
   */
  async restorePassword(
    user: any,
    verificationCode: number,
    newPassword: string,
  ) {
    if (verificationCode) {
      await this.usersService.update(user.id, { password: newPassword });
    }

    return {
      success: true,
    };
  }
}
