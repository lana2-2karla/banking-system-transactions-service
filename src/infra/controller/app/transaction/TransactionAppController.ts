import TransactionUseCase from '@app/transaction/TransactionUseCase';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import ITransactionUseCaseGetAllByUserIdOutput 
  from '@domain/case/transaction/output/ITransactionUseCaseGetAllByUserIdOutput';
import TransactionAppControllerCreateDTO from './dto/TransactionAppControllerCreateDTO';
import TransactionGetAllByUserIdQueryDTO from './dto/TransactionGetAllByUserIdQueryDTO';

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
      @Query() query: TransactionGetAllByUserIdQueryDTO,
  ): Promise<ITransactionUseCaseGetAllByUserIdOutput> {
    const { page, limit } = query;
    return this._transactionUseCase.getAllByUserId(userId, page, limit);
  }
}
export default TransactionAppController;