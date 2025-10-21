import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const TransactionGetAllByUserIdQuerySchema = z.object({
  page: z.coerce.number().min(1, { 
    message: 'page deve ser maior ou igual a 1', 
  }).optional().default(1),
  limit: z.coerce.number().min(1, { 
    message: 'limit deve ser maior ou igual a 1', 
  }).optional().default(10),
});

class TransactionGetAllByUserIdQueryDTO extends createZodDto(
  TransactionGetAllByUserIdQuerySchema,
) {}

export default TransactionGetAllByUserIdQueryDTO;