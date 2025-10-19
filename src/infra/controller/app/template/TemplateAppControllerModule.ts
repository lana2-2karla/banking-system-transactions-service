import { Module } from '@nestjs/common';
import TemplateAppController from './TemplateAppController';

@Module({
  imports: [],
  controllers: [TemplateAppController],
})

export default class TemplateAppControllerModule {}