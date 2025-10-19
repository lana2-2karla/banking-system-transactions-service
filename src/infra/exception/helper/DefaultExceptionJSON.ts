import IResponseError from '../interface/IResponseError';

type IDefaultException = 'defaultError';

const DefaultExceptionJSON: Record<IDefaultException, IResponseError> = {
  defaultError: {
    status: 500,
    json: { 
      message: 'Erro interno do servidor.',
      title: 'Erro interno do servidor, tente novamente.',
    },
  },
}; 

export default DefaultExceptionJSON;