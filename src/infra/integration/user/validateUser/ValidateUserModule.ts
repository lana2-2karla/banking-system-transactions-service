import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import ValidateUser from './ValidateUser';

@Module({
  imports: [HttpModule],
  providers: [ValidateUser],
  exports: [ValidateUser],
})
class ValidateUserModule {}

export default ValidateUserModule;