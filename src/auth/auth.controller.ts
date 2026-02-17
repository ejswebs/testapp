import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsString, IsNotEmpty, MinLength } from 'class-validator'; // 👈 1. IMPORTAR ESTO

// 👇 2. AGREGAR DECORADORES AL DTO
export class AuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4) // Opcional: mínimo 4 caracteres para la pass
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthDto) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: AuthDto) {
    return this.authService.register(body);
  }
}