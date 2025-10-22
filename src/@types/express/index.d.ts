import { IAuthJwtPayload } from '@infra/adapter/jwt/JwtAdapter';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IAuthJwtPayload;
  }
}
