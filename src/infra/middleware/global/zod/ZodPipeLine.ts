import { Provider } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

const ZodPipeLine: Provider = {
  provide: APP_PIPE,
  useClass: ZodValidationPipe,
};

export default ZodPipeLine;