import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      // 👇 Aquí está la magia: Usamos la URL completa
      url: process.env.DATABASE_URL,

      // ⚠️ IMPORTANTE: Aunque uses URL, Neon EXIGE esto explícitamente en NestJS
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },

      autoLoadEntities: true,
      synchronize: true, // Crea las tablas automáticamente (solo para test)
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
