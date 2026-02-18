import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "./entities/group.entity";
import { Category } from "./entities/category.entity";

@Injectable()
export class FinanceSeederService implements OnModuleInit {
  private readonly logger = new Logger(FinanceSeederService.name);

  constructor(
    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  // Este método se ejecuta AUTOMÁTICAMENTE cuando NestJS arranca
  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    // 1. Verificamos si ya hay grupos. Si hay, no hacemos nada para no duplicar.
    const count = await this.groupRepo.count();
    if (count > 0) {
      this.logger.log(
        "✅ Los rubros ya están en la base de datos. Saltando seeder...",
      );
      return;
    }

    this.logger.log(
      "⏳ Iniciando la carga automática de Rubros y Categorías...",
    );

    // 2. Aquí está TODA tu tabla mapeada exactamente como la pediste
    const INITIAL_DATA = [
      {
        name: "Gastos Corrientes",
        categories: [
          "LUZ",
          "CELULARES",
          "AGUA",
          "AGUA BIDON",
          "GAS",
          "INTERNET",
          "STREAMING",
          "AFIP Y RENTAS",
          "SOFTWARE",
          "IMPUESTOS MUNICIPALES",
          "PRESTAMO GLADYS",
          "HIPOTECA",
          "COMISIONES BANCARIAS",
          "EXCEDENTE GTOS CTES",
        ],
      },
      {
        name: "Vivienda Capitalizable",
        categories: [
          "ELECTRODOMÉSTICOS",
          "COMPUTACIÓN",
          "CONSTRUCCIÓN",
          "HERRAMIENTAS",
          "MUEBLES",
          "EXCEDENTE VIV CAP",
        ],
      },
      {
        name: "Mercaderías Escenciales",
        categories: [
          "ALIMENTOS MASCOTAS",
          "ALIMENTOS",
          "CARNE",
          "CEREALES - FR SECOS",
          "FRUTAS",
          "HIGIENE",
          "HOGAR",
          "LACTEOS",
          "LIMPIEZA",
          "PANADERIA",
          "PASTAS",
          "VERDURAS",
          "EXCEDENTE MERCADERIA",
        ],
      },
      {
        name: "Mercaderías NO Escenciales",
        categories: [
          "BAZAR",
          "BEBIDAS",
          "CONFITERIA",
          "GOLOSINAS",
          "POSTRES",
          "ROTISERIA",
          "SNACKS",
        ],
      },
      {
        name: "Transporte",
        categories: [
          "COMBUSTIBLE",
          "PEAJE/SS-VIAJE",
          "REPUESTOS VEHICULO",
          "TALLER/GOMERIA/LAVADERO",
          "VEHICULO",
          "PASAJES",
          "REMIS/TAXI",
          "SEGURO",
          "EXCEDENTE TRANSPORTE",
        ],
      },
      {
        name: "Ocio",
        categories: [
          "MASCOTAS",
          "SALIDAS",
          "VIAJES",
          "REGALOS",
          "CUMPLE/FIESTAS",
          "TEJIDOS",
          "JUEGOS",
          "EXCEDENTE OCIO",
        ],
      },
      {
        name: "Salud",
        categories: [
          "OPTICA",
          "FARMACIA",
          "CONSULTAS Y ANALISIS",
          "EXCEDENTE SALUD",
        ],
      },
      {
        name: "Educación",
        categories: [
          "LIBROS",
          "IETE",
          "LIBRERIA",
          "CURSOS/CUOTAS",
          "EXCEDENTE EDUCACION",
        ],
      },
      {
        name: "Mantenimiento",
        categories: [
          "ELECTRICIDAD",
          "FERRETERIA",
          "PLOMERIA",
          "PINTURERIA",
          "JARDINERÍA",
          "CERRAJERIA",
          "REP CELULARES",
          "REP ELECTRODOMESTICOS",
          "EXCEDENTE MANTENIMIENTO",
        ],
      },
      {
        name: "Indumentaria",
        categories: [
          "ACCESORIOS Y BIJOU",
          "CALZADO",
          "COSMETICOS",
          "ROPA",
          "EXCEDENTE INDUMENTARIA",
        ],
      },
      {
        name: "Otros",
        categories: ["GASTOS MES ANTERIOR", "OTROS", "EXCEDENTE OTROS"],
      },
      {
        name: "Ahorro e Inversión",
        categories: [
          "AHORRO CONSTRUCCIÓN",
          "AHORRO EDUCACIÓN",
          "AHORRO INDUMENTARIA",
          "AHORRO EMERGENCIA",
          "AHORRO VACACIONES",
          "AHORRO TRANSPORTE",
          "AHORRO QUINCHO",
          "AHORRO YESU",
          "AHORRO MASCOTAS",
          "AHORRO E INVERSION",
        ],
      },
      {
        name: "Diezmos",
        categories: [
          "DONACIONES",
          "MINISTERIO POLITICO",
          "OFRENDAS",
          "DIEZMOS",
        ],
      },
    ];

    // 3. Guardamos todo en la base de datos de Neon
    for (const item of INITIAL_DATA) {
      // Creamos el grupo principal
      const group = this.groupRepo.create({ name: item.name });
      const savedGroup = await this.groupRepo.save(group);

      // Creamos todas sus categorías enlazadas a ese grupo
      const categoriesToSave = item.categories.map((catName) =>
        this.categoryRepo.create({ name: catName, group: savedGroup }),
      );
      await this.categoryRepo.save(categoriesToSave);
    }

    this.logger.log("🚀 ¡Carga de rubros completada con éxito en la BD!");
  }
}
