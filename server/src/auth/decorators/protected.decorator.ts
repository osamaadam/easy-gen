import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';

export function Protected() {
  return UseGuards(JwtAuthGuard);
}
