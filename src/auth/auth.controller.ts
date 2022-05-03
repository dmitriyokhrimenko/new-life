import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Res,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { createUserDto } from '../users/dto/create-user.dto';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(
    @Body() userDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    Logger.log('get request /register', 'AuthController');
    const userData = await this.authService.register(userDto);
    // response.cookie('refreshToken', userData.refreshToken, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    // });
    console.log(userDto);
    return userData;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() userDto: createUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userData = await this.authService.login(userDto);
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return userData;
  }

  // @Get('forgot-password')
  // async forgotPassword(@Request() req) {
  //   Logger.log('get request /forgotPassword', 'AuthController');
  //
  //   return this.authService.forgotPassword(req.user);
  // }
  //
  // @Post('forgot-password')
  // async restorePassword(@Request() req) {
  //   Logger.log('post request /forgotPassword', 'AuthController');
  //   return this.authService.restorePassword(
  //     req.user,
  //     req.verificationCode,
  //     req.newPassword,
  //   );
  // }
}
