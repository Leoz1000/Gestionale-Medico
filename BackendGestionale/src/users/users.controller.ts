/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Roles } from 'src/common/guards/role.guard';
import { RoleGuard } from 'src/common/guards/roleControll.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //CREATE USER
  @Roles('admin', 'doctor')
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //GET ALL DOCTOR
  @Throttle({})
  @Get('/doctors')
  async findAllDoctor() {
    const users = await this.usersService.findAllDoctor();
    const filteredUser = users.map((user) => {
      return { _id: user._id, name: user.name };
    });
    return filteredUser;
  }

  //GET ALL USER
  @Throttle({})
  @Roles('admin', 'doctor', 'secretary')
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Post('/all')
  async findAll(@Body() Body: any) {
    const users = this.usersService.findAll();
    const filteredUser: [
      {
        _id: any;
        name: string;
        username: string;
        role: string;
        email: string;
        phone: string;
      },
    ] = [null];
    (await users).forEach((user) => {
      if (user._id != Body.sub) {
        const ele = {
          _id: user._id,
          name: user.name,
          username: user.username,
          role: user.role,
          email: user.email,
          phone: user.phone,
        };
        if (filteredUser[0] == null) filteredUser[0] = ele;
        else filteredUser.push(ele);
      }
    });
    return filteredUser;
  }
  //FIND USER BY ID
  @Roles('admin', 'doctor', 'secretary')
  @Get(':id')
  @UseGuards(AccessTokenGuard, RoleGuard)
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
  //UPDATE USER
  @Roles('admin', 'doctor')
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  //DELETE USER
  @Roles('admin', 'doctor')
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Headers('role') role: string) {
    if (
      role == 'doctor' &&
      (await this.usersService.findById(id)).role !== 'admin'
    )
      return this.usersService.remove(id);
  }
}
