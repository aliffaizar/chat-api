import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService, User } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }): User {
    return this.authService.login(body.email, body.password);
  }

  @Get('user/:id')
  getUser(@Param('id') id: string): User {
    return this.authService.getUser(id);
  }
}
