import IMobileError from '../interface/IMobileError';

type IDefaultException = 'defaultError';

const DefaultExceptionJSON: Record<IDefaultException, IMobileError> = {
  defaultError: {
    status: 500,
    json: { 
      message: 'Erro interno do servidor.',
      title: 'Erro interno do servidor, tente novamente.',
    },
  },
}; 

export default DefaultExceptionJSON;