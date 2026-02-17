import { Injectable, BadRequestException } from "@nestjs/common";
import { UsersService } from "../users/users.services";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"; // <--- ESTO EVITA EL ERROR 503

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

  async validateGoogleUser(googleProfile: any) {
    const email = googleProfile.email;

    // 1. Buscamos si ya existe
    const user = await this.usersService.findOne(email);

    if (user) {
      // Si existe, retornamos el usuario para generar el token
      return user;
    }

    // 2. Si no existe, lo registramos automáticamente
    console.log("Creando usuario nuevo de Google:", email);
    const newUser = await this.usersService.create({
      username: email,
      password: null, // Sin contraseña
      // googleId: googleProfile.id (si agregaste el campo a la entidad)
    });

    return newUser;
  }

  async register(userData: any) {
    // Verificar si ya existe
    const existing = await this.usersService.findOne(userData.username);
    if (existing) {
      throw new BadRequestException("El usuario ya existe");
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
