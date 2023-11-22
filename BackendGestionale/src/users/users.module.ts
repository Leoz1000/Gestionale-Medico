/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AccessTokenStrategy } from 'src/auth/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/auth/strategies/refreshToken.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AccessTokenStrategy],
  exports: [UsersService],
})
export class UsersModule {}
