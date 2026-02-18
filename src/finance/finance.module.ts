import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Category } from "./entities/category.entity";
import { Transaction } from "./entities/transaction.entity";
import { FinanceSeederService } from "./finance-seeder.service";
import { FinanceService } from "./finance.service"; // 👈 Nuevo
import { FinanceController } from "./finance.controller"; // 👈 Nuevo

@Module({
  imports: [TypeOrmModule.forFeature([Group, Category, Transaction])],
  controllers: [FinanceController], // 👈 Agregado
  providers: [FinanceSeederService, FinanceService], // 👈 Agregado
})
export class FinanceModule {}
