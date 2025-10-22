import TransactionUseCase from '@app/transaction/TransactionUseCase';
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import ITransactionUseCaseGetAllByUserIdOutput 
  from '@domain/case/transaction/output/ITransactionUseCaseGetAllByUserIdOutput';
import AuthorizationException from '@domain/exception/authorization/AuthorizationException';
import { Request } from 'express';
import TransactionAppControllerCreateDTO from './dto/TransactionAppControllerCreateDTO';
import TransactionGetAllByUserIdQueryDTO from './dto/TransactionGetAllByUserIdQueryDTO';

@Controller()
class TransactionAppController {
  constructor(
    private readonly _transactionUseCase: TransactionUseCase,
  ) { }
  @Post()
  async create(
    @Body() body: TransactionAppControllerCreateDTO,
      @Req() req: Request,
  ): Promise<void> {
    if (body.senderId !== req.user.id) {
      throw new AuthorizationException('forbidden');
    }
    await this._transactionUseCase.create(body);
  }

  @Get('user/:userId')
  async getAllByUserId(
    @Param('userId') userId: string,
      @Query() query: TransactionGetAllByUserIdQueryDTO,
      @Req() req: Request,
  ): Promise<ITransactionUseCaseGetAllByUserIdOutput> {
    if (userId !== req.user.id) {
      throw new AuthorizationException('forbidden');
    }
    const { page, limit } = query;
    return this._transactionUseCase.getAllByUserId(userId, page, limit);
  }
}
export default TransactionAppController;