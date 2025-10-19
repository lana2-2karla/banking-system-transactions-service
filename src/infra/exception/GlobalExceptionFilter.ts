import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';
import DefaultExceptionJSON from './helper/DefaultExceptionJSON';

type IErrorResponse = { status: number; json: object | string };

@Catch()
class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    console.log({ exception });
    console.log({ method: request.method, route: request.url });

    const errorResponse:IErrorResponse = DefaultExceptionJSON.defaultError;

    return response.status(errorResponse.status).json(errorResponse.json);
  }
}

export default GlobalExceptionFilter;
