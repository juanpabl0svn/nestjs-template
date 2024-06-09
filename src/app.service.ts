import { Injectable } from '@nestjs/common';
import { PrismaService } from './providers/prisma.service';


@Injectable()
export class AppService {


  constructor(private prisma: PrismaService) {

  }




  health(): string {

    return 'Health'
  }
}
