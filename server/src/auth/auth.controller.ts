import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Protected } from './decorators/protected.decorator';
import { UserCreateRequestDto, UserLoginRequestDto } from './dtos/request.dto';
import { UserAuthResponseDto, UserTokensDto } from './dtos/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register user',
    description: 'Register user with email, name and password',
  })
  @ApiOkResponse({ type: UserAuthResponseDto })
  @Post('register')
  register(@Body() body: UserCreateRequestDto): Promise<UserAuthResponseDto> {
    return this.authService.register(body);
  }

  @ApiOperation({
    summary: 'Login user',
    description: 'Login user with email and password',
  })
  @ApiOkResponse({ type: UserAuthResponseDto })
  @Post('login')
  login(@Body() body: UserLoginRequestDto): Promise<UserAuthResponseDto> {
    return this.authService.login(body);
  }

  @ApiOperation({
    summary: 'Refresh token',
    description: 'Refresh tokens using refresh token',
  })
  @Protected()
  @ApiOkResponse({ type: UserTokensDto })
  @Get('refresh')
  refresh(
    @Headers('authorization') authHeader: string,
  ): Promise<UserTokensDto> {
    const token = authHeader.split(' ')[1];
    return this.authService.refreshToken(token);
  }
}
