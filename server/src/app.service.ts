import { Injectable } from '@nestjs/common';
import { TokenPayload } from './auth/types/token-payload.type';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  async home(payload: TokenPayload) {
    const user = await this.userService.getUserById(payload.id);

    return {
      ...user?.toObject(),
      id: user?._id,
    };
  }
}
