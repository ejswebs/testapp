import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { Transaction } from './entities/transaction.entity';
import { Category } from './entities/category.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

  // 1. Obtener todos los grupos con sus categorías adentro
  async getGroupsWithCategories() {
    return this.groupRepo.find({
      relations: ['categories'], // Trae las categorías anidadas
      order: { name: 'ASC' },    // Ordenadas alfabéticamente
    });
  }

  // 2. Guardar un nuevo movimiento de dinero
  async createTransaction(userId: number, dto: CreateTransactionDto) {
    const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
    
    if (!category) {
      throw new NotFoundException('La categoría seleccionada no existe');
    }

    const newTransaction = this.transactionRepo.create({
      amount: dto.amount,
      type: dto.type,
      date: dto.date,
      note: dto.note,
      category: category,
      user: { id: userId }, // Asociamos el gasto al usuario logueado
    });

    return this.transactionRepo.save(newTransaction);
  }

  // 3. Obtener el historial de un usuario específico
  async getUserTransactions(userId: number) {
    return this.transactionRepo.find({
      where: { user: { id: userId } },
      relations: ['category', 'category.group'], // Traemos los detalles del rubro
      order: { date: 'DESC', createdAt: 'DESC' }, // Los más recientes primero
    });
  }
}