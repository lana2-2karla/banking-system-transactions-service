interface IAuthJwtPayloadOutput {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
  [key: string]: any;
}

export default IAuthJwtPayloadOutput;