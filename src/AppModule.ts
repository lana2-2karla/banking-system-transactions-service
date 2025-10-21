import JwtAdapterModule from '@infra/adapter/jwt/JwtAdapterModule';
import TransactionAppController from '@infra/controller/app/transaction/TransactionAppController';
import ControllerModule from '@infra/controller/ControllerModule';
import UserAuthMiddleware from '@infra/middleware/authorization/UserAuthMiddleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
  imports: [
    ControllerModule,
    JwtAdapterModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware)
      .forRoutes(TransactionAppController);
  }
}
