import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UserDocument } from '../user/entities/user.entity';
import { UserCreateRequestDto, UserLoginRequestDto } from './dtos/request.dto';
import { TokenPayload } from './types/token-payload.type';
import { UserAuthResponseDto } from './dtos/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: UserCreateRequestDto): Promise<UserAuthResponseDto> {
    const existingUser = await this.userService.getUserByEmail(dto.email);
    if (existingUser) {
      return this.login({
        email: dto.email,
        password: dto.password,
      });
    }

    const hashedPassword = await this.__hashPassword(dto.password);
    const user = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
    });

    return {
      tokens: this.__createTokens(user),
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync<TokenPayload>(
      refreshToken,
      { secret: process.env.JWT_SECRET },
    );
    if (!payload) {
      throw new BadRequestException('Invalid refresh token');
    }
    const user = await this.userService.getUserById(payload.id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const tokens = this.__createTokens(user);

    return {
      ...tokens,
    };
  }

  async login({
    email,
    password,
  }: UserLoginRequestDto): Promise<UserAuthResponseDto> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password!);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      tokens: this.__createTokens(user),
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    };
  }

  private __createTokens(user: UserDocument) {
    const payload: TokenPayload = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }

  private __hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return hash(password, saltRounds);
  }
}
