import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Permite peticiones desde cualquier frontend

  app.setGlobalPrefix("api");

  // Validación Global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Borra campos que no estén en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían campos extra
      transform: true,
    }),
  );

  // Escuchar en 0.0.0.0 es OBLIGATORIO para Hostinger
  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0");

  console.log(`🚀 Servidor corriendo en puerto: ${port}`);
}
bootstrap();
