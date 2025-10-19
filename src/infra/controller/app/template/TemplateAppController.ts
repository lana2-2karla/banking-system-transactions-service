import { Controller, Get } from '@nestjs/common';

@Controller('test')
class TemplateAppController {
  @Get()
  testEndpoint(): { message: string } {
    return { message: 'NestJS está funcionando corretamente! 🚀' };
  }
}
export default TemplateAppController;