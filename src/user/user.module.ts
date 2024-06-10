import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JWTConfig } from 'src/config';
import { JWTGuard } from 'src/guards/jwt.guard';
import { JwtStrategy } from 'src/strategies/jwt.strategy';




@Module({
  controllers: [UserController],
  providers: [UserService, JWTGuard, JwtStrategy],
  imports: [
    JwtModule.registerAsync(JWTConfig)
  ]
})
export class userModule { }
