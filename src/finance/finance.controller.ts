import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FinanceService } from './finance.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('finance')
@UseGuards(AuthGuard('jwt')) // 👈 SEGURIDAD: Nadie entra sin token
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  // GET /api/finance/groups
  @Get('groups')
  getGroups() {
    return this.financeService.getGroupsWithCategories();
  }

  // POST /api/finance/transactions
  @Post('transactions')
  createTransaction(@Req() req, @Body() body: CreateTransactionDto) {
    // req.user viene del JWT decodificado gracias al AuthGuard
    const userId = req.user.userId; 
    return this.financeService.createTransaction(userId, body);
  }

  // GET /api/finance/transactions
  @Get('transactions')
  getUserTransactions(@Req() req) {
    const userId = req.user.userId;
    return this.financeService.getUserTransactions(userId);
  }
}