import { Controller, Get } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AppService } from './app.service';
import { Protected } from './auth/decorators/protected.decorator';
import { User } from './auth/decorators/user.decorator';
import { TokenPayload } from './auth/types/token-payload.type';
import { User as UserEntity } from './user/entities/user.entity';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiProperty({
    description: 'Hello world endpoint',
  })
  @ApiOkResponse({
    type: UserEntity,
  })
  @Protected()
  @Get()
  async getHello(@User() tokenPayload: TokenPayload) {
    const user = await this.appService.home(tokenPayload);

    return plainToInstance(UserEntity, user);
  }
}
