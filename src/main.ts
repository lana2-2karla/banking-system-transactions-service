import { NestFactory } from '@nestjs/core';
import GlobalExceptionFilter from '@infra/exception/GlobalExceptionFilter';
import * as dotenv from 'dotenv';
import AppModule from './AppModule';

dotenv.config();

async function bootstrap() {
  const port = Number(process.env.PORT) || 3007;
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(port, () => { console.log(`Running server on port: ${port}`); });
}

bootstrap();
