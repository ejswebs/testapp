import { Controller, Get, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "./message.entity";

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
  ) {}

  // 1. Endpoint para LEER (Entras a tu-dominio.com/)
  @Get()
  async getMessages() {
    const messages = await this.messageRepo.find({
      order: { createdAt: "DESC" },
    });
    return {
      status: "Conectado a Neon DB 🚀",
      total: messages.length,
      data: messages,
    };
  }

  // 2. Endpoint "Trucho" para CREAR datos desde el navegador
  // Uso: tu-dominio.com/add?text=HolaMundo
  @Get("add")
  async createMessage(@Query("text") text: string) {
    if (!text) return "Escribe algo en la url: /add?text=Hola";

    const newMessage = this.messageRepo.create({ content: text });
    await this.messageRepo.save(newMessage);

    return "✅ Mensaje Guardado: " + text;
  }
}
