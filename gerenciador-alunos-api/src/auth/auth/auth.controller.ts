import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../../guards/jwt.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { Role } from '../decorators/role.decorator';
import { AuthService } from './auth.service';

@Controller('oauth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('token')
  login(@Body() body) {
    return { token: this.authService.login(body.username, body.password) };
  }

  @Role('admin')
  @UseGuards(JwtGuard, AuthGuard)
  @Get('test-auth')
  test(@Req() req) {
    return {
      name: 'Leandro F Chaves',
    };
  }
}
