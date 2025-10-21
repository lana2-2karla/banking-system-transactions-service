import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import JwtAdapter from './JwtAdapter';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [JwtAdapter],
  exports: [JwtAdapter],
})
class JwtAdapterModule {}

export default JwtAdapterModule;
