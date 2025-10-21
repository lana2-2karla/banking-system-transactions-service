import IAuthJwtPayloadOutput from './output/IAuthJwtPayloadOutput';

interface IJwtAdapter {
  verifyToken(token: string): IAuthJwtPayloadOutput
}

export default IJwtAdapter;