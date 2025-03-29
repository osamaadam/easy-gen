import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TokenPayload } from '../types/token-payload.type';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(
    err: any,
    user: TokenPayload,
    _info: any,
    context: ExecutionContext,
  ): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    const request: Request = context.switchToHttp().getRequest();
    request.user = user;
    return user;
  }
}
