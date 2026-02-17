import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Usa una variable de entorno o un fallback para desarrollo
      secretOrKey: process.env.JWT_SECRET || 'MI_SECRETO_SUPER_SEGURO',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}