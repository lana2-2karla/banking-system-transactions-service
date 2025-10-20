import { ZodValidationException } from 'nestjs-zod';
import IZodError from '../interface/IZodError';

const FormatZodException = (exception: ZodValidationException): IZodError => {
  const { issues } = exception.getZodError();

  const status = 400;
  const title = 'Erro de validação.';
  const message = `Falha nos campos: ${issues.map(({ path }) => path.join('.')).join(', ')}.`;
  const error = issues;

  const mobileError: IZodError = {
    status,
    json: {
      title,
      message,
      error,
    },
  };

  return mobileError;
};

export default FormatZodException;