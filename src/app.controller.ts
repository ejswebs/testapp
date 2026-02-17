import { Controller, Get } from "@nestjs/common";
import { DataSource } from "typeorm"; // Importamos el gestor de conexión manual

@Controller()
export class AppController {
  @Get()
  async checkDbConnection() {
    // 1. Definimos la conexión con TUS DATOS EXACTOS
    const dataSource = new DataSource({
      type: "postgres",
      url: "postgresql://neondb_owner:npg_KiuWJZL08oRq@ep-square-smoke-ac66qced-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    });

    try {
      // 2. Intentamos conectar
      await dataSource.initialize();

      // 3. Si llega aquí, es que funcionó
      await dataSource.destroy(); // Cerramos para no dejar conexiones colgadas
      return `
        <div style="background-color: #d4edda; color: #155724; padding: 20px; font-family: sans-serif;">
          <h1>✅ ¡CONEXIÓN EXITOSA!</h1>
          <p>Tu Connection String y configuración SSL son correctos.</p>
          <p>Ya puedes volver a poner el código en el AppModule.</p>
        </div>
      `;
    } catch (error) {
      // 4. Si falla, capturamos el error y lo mostramos
      return `
        <div style="background-color: #f8d7da; color: #721c24; padding: 20px; font-family: sans-serif;">
          <h1>❌ ERROR DE CONEXIÓN</h1>
          <h3>El servidor respondió:</h3>
          <pre style="background: #fff; padding: 15px; border: 1px solid #ccc;">${JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}</pre>
          <p>Revisa si el host es accesible o si la contraseña es correcta.</p>
        </div>
      `;
    }
  }
}
