import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateRequestDto, UserLoginRequestDto } from './dtos/request.dto';
import { Protected } from './decorators/protected.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: UserCreateRequestDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: UserLoginRequestDto) {
    return this.authService.login(body);
  }

  @Protected()
  @Get('refresh')
  refresh(@Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.authService.refreshToken(token);
  }
}
