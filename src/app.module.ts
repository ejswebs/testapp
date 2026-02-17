import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";

@Module({
  imports: [
    /* TypeOrmModule.forRoot({
      type: "postgres",
      // 👇 Aquí está la magia: Usamos la URL completa
      url: "postgresql://neondb_owner:npg_KiuWJZL08oRq@ep-square-smoke-ac66qced-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",

      // ⚠️ IMPORTANTE: Aunque uses URL, Neon EXIGE esto explícitamente en NestJS
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },

      autoLoadEntities: true,
      synchronize: true, // Crea las tablas automáticamente (solo para test)
    }), */
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
