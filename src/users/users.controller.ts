import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUser(@Request() req) {
    return await this.userService.getById(req.user.userId);
  }

  @Post()
  async create(@Body() userDto: createUserDto) {
    return await this.userService.createUser(userDto);
  }
}
