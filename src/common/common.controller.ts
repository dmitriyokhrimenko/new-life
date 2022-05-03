import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('common')
export class CommonController {
  @Get('health-check')
  @HttpCode(200)
  healthCheck() {}
}
