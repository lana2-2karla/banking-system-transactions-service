import IAuthJwtPayloadOutput from '@domain/adapter/jwt/output/IAuthJwtPayloadOutput';
import JwtAdapter from '@infra/adapter/jwt/JwtAdapter';
import AuthorizationExceptionJSON from '@infra/exception/helper/AuthorizationExceptionJSON';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
class UserAuthMiddleware implements NestMiddleware {
  constructor(private readonly _jwtAdapter: JwtAdapter) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = this._extractToken(req);

    if (!token) return this._respondWithAuthError(res, 'tokenNotProvided');

    try {
      const payload = this._verifyToken(token);

      if (!this._isUserRole(payload)) {
        return this._respondWithAuthError(res, 'forbidden');
      }

      req.user = payload;
      next();
    } catch (err) {
      this._handleJwtError(res, err);
    }
  }

  private _extractToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    return authHeader.replace('Bearer ', '');
  }

  private _verifyToken(token: string): IAuthJwtPayloadOutput {
    return this._jwtAdapter.verifyToken(token) as IAuthJwtPayloadOutput;
  }

  private _isUserRole(payload: IAuthJwtPayloadOutput): boolean {
    return payload.role === 'user';
  }

  private _handleJwtError(res: Response, err: unknown): void {
    if (err instanceof TokenExpiredError) {
      return this._respondWithAuthError(res, 'expiredToken');
    }

    if (err instanceof JsonWebTokenError) {
      return this._respondWithAuthError(res, 'invalidToken');
    }

    this._respondWithAuthError(res, 'forbidden');
  }

  private _respondWithAuthError(
    res: Response,
    type: keyof typeof AuthorizationExceptionJSON,
  ): void {
    const error = AuthorizationExceptionJSON[type];
    res.status(error.status).json(error.json);
  }
}

export default UserAuthMiddleware;
