import { ZodIssue } from 'nestjs-zod/z';

interface IZodError {
  status: number,
  json: {
    title: string,
    message: string,
    error: Array<ZodIssue>
  }
}

export default IZodError;