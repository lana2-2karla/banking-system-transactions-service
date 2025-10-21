import TransactionUseCase from '@app/transaction/TransactionUseCase';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import TTransactionUseCaseGetByUserIdOutput 
  from '@domain/case/transaction/output/TTransactionUseCaseGetByUserIdOutput';
import TransactionAppControllerCreateDTO from './dto/TransactionAppControllerCreateDTO';

@Controller()
class TransactionAppController {
  constructor(
    private readonly _transactionUseCase: TransactionUseCase,
  ) { }
  @Post()
  async create(@Body() body: TransactionAppControllerCreateDTO) {
    await this._transactionUseCase.create(body);
  }

  @Get('user/:userId')
  async getAllByUserId(
    @Param('userId') userId: string,
  ): Promise<TTransactionUseCaseGetByUserIdOutput[]> {
    return this._transactionUseCase.getAllByUserId(userId);
  }
}
export default TransactionAppController;