import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '¡SI LEES ESTO, EL SERVIDOR FUNCIONA! Ahora podemos agregar la BD.';
  }
}