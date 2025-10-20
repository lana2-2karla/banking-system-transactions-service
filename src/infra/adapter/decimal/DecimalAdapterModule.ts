import { Module } from '@nestjs/common';
import DecimalAdapter from './DecimalAdapter';

@Module({
  imports: [],
  providers: [DecimalAdapter],
  exports: [DecimalAdapter],
})
class DecimalAdapterModule {}

export default DecimalAdapterModule;