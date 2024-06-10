import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AppService {


  constructor() {

  }


  health(): string {

    return 'Health'
  }
}
