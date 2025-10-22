import TTransactionException from '@domain/exception/transaction/TTransactionException';
import IResponseError from '../interface/IResponseError';

const TransactionExceptionJSON: Record<TTransactionException, IResponseError> = {
  sameUserError: {
    status: 400,
    json: {
      title: 'Transferência inválida',
      message: 'Não é possível transferir para si mesmo.',
    },
  },
  invalidAmountError: {
    status: 400,
    json: {
      title: 'Valor inválido',
      message: 'O valor da transação deve ser maior que zero.',
    },
  },
  senderNotFound: {
    status: 404,
    json: {
      title: 'Usuário remetente não encontrado',
      message: 'O usuário que está enviando o valor não foi localizado.',
    },
  },
  receiverNotFound: {
    status: 404,
    json: {
      title: 'Usuário destinatário não encontrado',
      message: 'O usuário que está recebendo o valor não foi localizado.',
    },
  },
  insufficientBalance: {
    status: 400,
    json: {
      title: 'Saldo insuficiente',
      message: 'O usuário remetente não possui saldo suficiente para esta transação.',
    },
  },
  unexpectedError: {
    status: 500,
    json: {
      title: 'Erro inesperado',
      message: 'Ocorreu um erro inesperado ao processar a transação. Tente novamente.',
    },
  },
};

export default TransactionExceptionJSON;
