import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Category } from "./entities/category.entity";
import { Transaction } from "./entities/transaction.entity";
import { FinanceSeederService } from "./finance-seeder.service";

@Module({
  // Importamos las tablas para poder usarlas
  imports: [TypeOrmModule.forFeature([Group, Category, Transaction])],
  controllers: [],
  providers: [FinanceSeederService],
})
export class FinanceModule {}
