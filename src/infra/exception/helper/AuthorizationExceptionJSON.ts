import TAuthorizationException from '@domain/exception/authorization/TAuthorizationException';
import IResponseError from '../interface/IResponseError';

const AuthorizationExceptionJSON: Record<TAuthorizationException, IResponseError> = {
  tokenNotProvided: {
    status: 401,
    json: { 
      title: 'Token não fornecido',
      message: 'É necessário fornecer um token de autenticação.', 
    },
  },
  invalidToken: {
    status: 401,
    json: { 
      title: 'Token inválido', 
      message: 'O token fornecido é inválido.', 
    },
  },
  expiredToken: {
    status: 401,
    json: { 
      title: 'Token expirado',
      message: 'O token fornecido expirou.', 
    },
  },
  forbidden: {
    status: 403,
    json: { 
      title: 'Acesso negado',
      message: 'Você não tem permissão para acessar este recurso.', 
    },
  },
};

export default AuthorizationExceptionJSON;
