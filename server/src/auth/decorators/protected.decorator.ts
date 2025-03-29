import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';

export function Protected() {
  return applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
}
