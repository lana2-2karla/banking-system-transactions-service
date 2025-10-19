import { Module } from '@nestjs/common';
import { Routes } from '@nestjs/core';
import TemplateAppControllerModule from './template/TemplateAppControllerModule';

const appRoutes: Routes = [
  {
    path: 'template',
    module: TemplateAppControllerModule,
  },
];

@Module({
  imports: [
    TemplateAppControllerModule,
  ],
})
class AppControllerModule {}

export { appRoutes };
export default AppControllerModule;