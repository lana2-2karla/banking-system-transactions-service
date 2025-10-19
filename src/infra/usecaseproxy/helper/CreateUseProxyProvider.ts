import { Provider } from '@nestjs/common';

type TClass = new (...args: any) => any;

type ClassConstructor<T> = new (...args: any) => T;

type ConstructorParameters<T> = T extends new (...args: infer U) => any ? U : never;

type ClassArray<T extends object> = {
  [P in keyof T]: ClassConstructor<T[P]>
};

type ClassArgs<T extends TClass> = ClassArray<ConstructorParameters<T>>;

const CreateUseProxyProvider = <T extends TClass>(
  UseCaseClass: T,
  args: ClassArgs<T>,
): Provider => ({
    inject: args as never,
    provide: UseCaseClass,
    useFactory: (...factorArgs) => new UseCaseClass(...factorArgs),
  });

export default CreateUseProxyProvider;