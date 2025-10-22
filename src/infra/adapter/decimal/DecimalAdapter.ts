import IDecimalAdapter from '@domain/adapter/decimal/IDecimalAdapter';
import { Injectable } from '@nestjs/common';
import Decimal from 'decimal.js';

@Injectable()
class DecimalAdapter implements IDecimalAdapter {
  isLessThan(value: string, compareTo: string): boolean {
    return new Decimal(value).lt(new Decimal(compareTo));
  }
}

export default DecimalAdapter;
