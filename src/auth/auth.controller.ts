import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Res,
  UseGuards,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Response } from "express"; // Importar Response de express

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

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() body: AuthDto) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException("Credenciales incorrectas");
    }
    return this.authService.login(user);
  }

  @Post("register")
  async register(@Body() body: AuthDto) {
    return this.authService.register(body);
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {}

  // 👇 2. Google nos devuelve al usuario aquí
  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    // req.user viene de GoogleStrategy -> validate
    const googleUser = req.user;

    // Buscamos o creamos el usuario en nuestra BD
    const userDb = await this.authService.validateGoogleUser(googleUser);

    // Generamos el JWT de nuestra app
    const jwt = await this.authService.login(userDb);

    // 👇 MAGIA: Redirigimos al Frontend con el token en la URL
    // En producción usa tu dominio real, en local localhost
    // Puedes usar una variable de entorno para esto: FRONTEND_URL
    res.redirect(`/?token=${jwt.access_token}`);
  }
}
