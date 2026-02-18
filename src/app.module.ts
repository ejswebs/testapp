import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { Message } from "./message.entity";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
// Importa aquí tus otros módulos (AuthModule, UsersModule, etc.)

@Module({
  imports: [
    // 1. Configuración global (por si la usas en otros lados)
    ConfigModule.forRoot({ isGlobal: true }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client"), // Buscará en la carpeta /client de la raíz
      exclude: ["/api/(.*)"], // No interferir con las rutas de la API
    }),

    // 2. La conexión a BD que YA SABEMOS QUE FUNCIONA
    TypeOrmModule.forRoot({
      type: "postgres",
      // 👇 TRUCO: Usamos process.env directo para evitar problemas con ConfigService
      // Asegúrate de tener la variable DATABASE_URL en Hostinger con el valor largo que probaste
      url:
        process.env.DATABASE_URL ||
        "postgresql://neondb_owner:npg_KiuWJZL08oRq@ep-square-smoke-ac66qced-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require",

      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      autoLoadEntities: true,
      synchronize: true, // ¡OJO! En producción ponlo en false cuando termines de desarrollar
    }),

    TypeOrmModule.forFeature([Message]),
    // 3. Tus módulos de funcionalidad (Descomenta los que tengas)
    AuthModule,
    UsersModule,
    FinanceModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
