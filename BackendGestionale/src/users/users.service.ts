/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  async findAllDoctor(): Promise<UserDocument[]> {
    return await this.userModel.find({ role: 'doctor' }).exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return await this.userModel.findOne({ username }).exec();
  }

  async updateRefreshToken(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    if (updateUserDto.password != null) {
      const hash = await this.hashData(updateUserDto.password);
      const hashedUser = { ...updateUserDto, password: hash };
      return await this.userModel
        .findByIdAndUpdate(id, hashedUser, { new: true })
        .exec();
    }
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  hashData(data: string): Promise<string> {
    return argon2.hash(data);
  }

  async remove(id: string): Promise<any> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
