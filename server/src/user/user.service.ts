import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateRequestDto } from 'src/auth/dtos/request.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async getUserById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  createUser(dto: UserCreateRequestDto): Promise<UserDocument> {
    const newUser = new this.userModel(dto);
    return newUser.save();
  }
}
