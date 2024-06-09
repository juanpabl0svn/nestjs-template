import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/providers/prisma.service';
import { BcryptService } from 'src/providers/bcrypt.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';



@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, BcryptService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }
    })
  ]
})
export class userModule { }
