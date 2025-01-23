import { Controller, Get, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';

@Controller()
export class AppController {
  @Get('/')
  getData(): string {
    const data = crypto.randomBytes(10).toString('base64');
    console.log('Generated data:', data); // Loga o valor gerado
    return data;
  }

  @Get('/example')
  handleNotFound() {
    throw new NotFoundException();
  }
}
