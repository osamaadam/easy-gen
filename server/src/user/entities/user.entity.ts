import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
  timestamps: true,
})
export class User {
  @ApiProperty({ example: '1234567890abcdef12345678' })
  id: string;

  @ApiProperty({ example: 'test.email@email.com' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  @Exclude()
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
