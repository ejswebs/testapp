import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID:
        process.env.GOOGLE_CLIENT_ID ||
        "905790414466-6ievv72qk6o1ba7ivo3u83ct154505c5.apps.googleusercontent.com",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        "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",
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "https://green-loris-138701.hostingersite.com/api/auth/google/callback", // Ej: https://tudominio.com/api/auth/google/callback
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
