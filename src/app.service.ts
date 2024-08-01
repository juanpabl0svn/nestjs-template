import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  health(): string {
    return 'Health'
  }
}