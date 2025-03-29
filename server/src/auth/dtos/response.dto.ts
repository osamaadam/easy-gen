import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class UserTokensDto {
  @ApiProperty({ description: 'Access token for authentication' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token for refreshing the access token' })
  refreshToken: string;
}

export class UserAuthResponseDto {
  @ApiProperty({ type: UserTokensDto })
  tokens: UserTokensDto;

  @ApiProperty({ type: User })
  user: User;
}
