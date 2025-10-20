import TransactionUseCase from '@app/transaction/TransactionUseCase';
import { Body, Controller, Post } from '@nestjs/common';
import TransactionAppControllerCreateDTO from './dto/TransactionAppControllerCreateDTO';

@Controller()
class TransactionAppController {
  constructor(
    private readonly _transactionUseCase: TransactionUseCase,
  ) { }
  @Post()
  async create(@Body() body: TransactionAppControllerCreateDTO) {
    console.log(body, 'bodyyyy');
    await this._transactionUseCase.create(body);
  }
}
export default TransactionAppController;