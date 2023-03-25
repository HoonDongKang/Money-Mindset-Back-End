import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtRefreshAuthGuard } from './auth/refresh-jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/cookies')
  @UseGuards(JwtRefreshAuthGuard)
  getCookies(@Request() req): any {
    return req.user;
  }
}
