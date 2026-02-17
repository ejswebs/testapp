import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.services';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'; // <--- ESTO EVITA EL ERROR 503

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: any) {
    // Verificar si ya existe
    const existing = await this.usersService.findOne(userData.username);
    if (existing) {
      throw new BadRequestException('El usuario ya existe');
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const newUser = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    const { password, ...result } = newUser;
    return result;
  }
}