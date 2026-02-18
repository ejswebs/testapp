import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Category } from "./entities/category.entity";
import { Transaction } from "./entities/transaction.entity";

@Module({
  // Importamos las tablas para poder usarlas
  imports: [TypeOrmModule.forFeature([Group, Category, Transaction])],
  controllers: [],
  providers: [],
})
export class FinanceModule {}
