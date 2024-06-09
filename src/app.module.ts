import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './providers/prisma.service';
import { userModule } from './auth/user.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), userModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
