import IJwtAdapter from '@domain/adapter/jwt/IJwtAdapter';
import IAuthJwtPayloadOutput from '@domain/adapter/jwt/output/IAuthJwtPayloadOutput';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class JwtAdapter implements IJwtAdapter {
  constructor(private readonly jwtService: JwtService) {}

  verifyToken(token: string): IAuthJwtPayloadOutput {
    return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
  }
}

export default JwtAdapter;
