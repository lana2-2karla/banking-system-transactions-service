import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import ZodPipeLine from '@infra/middleware/global/zod/ZodPipeLine';
import AppControllerModule, { appRoutes } from './app/AppControllerModule';

const routes: Routes = [
  {
    path: 'api',
    module: AppControllerModule,
    children: appRoutes,
  },
];

@Module({
  imports: [
    AppControllerModule,
    RouterModule.register(routes),
  ],
  providers: [ZodPipeLine],
})
class ControllerModule {}

export default ControllerModule;