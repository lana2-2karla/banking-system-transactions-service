import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const TransactionAppControllerCreateSchema = z.object({
  senderId: z.string().uuid({ message: 'senderId deve ser um UUID válido' }),
  receiverId: z.string().uuid({ message: 'receiverId deve ser um UUID válido' }),
  amount: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: 'amount deve conter apenas números válidos.' }),
});

class TransactionAppControllerCreateDTO extends createZodDto(
  TransactionAppControllerCreateSchema,
) {}

export default TransactionAppControllerCreateDTO;