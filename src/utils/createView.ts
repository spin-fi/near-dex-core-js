import {Config} from '../types';

type Method<T, R> = (request: T) => Promise<R>;

type MethodCreator<T, R> = (config: Config) => Method<T, R>;

type Utils<T> = {
  methodify: <R>(fn: MethodCreator<T, R>) => MethodCreator<T, R>;
};

type View<T, R> = {
  createMethod: MethodCreator<T, R>;
};

export const createView = <T, R>(create: (utils: Utils<T>) => View<T, R>) => {
  const methodify = <S>(fn: MethodCreator<T, S>) => {
    return fn;
  };

  return create({
    methodify,
  });
};
