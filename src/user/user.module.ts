import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { JWT_SECRET, JWT_EXPIRES_IN } from '../constants';



@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService],
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN }
    })
  ]
})
export class userModule { }
