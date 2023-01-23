import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {CoreConfig} from '../types';
import {CoreParams} from '../types/selector';

export type Params<T, C> = (request: T, unitConfig?: C) => Promise<CoreParams | undefined>;

export type ParamsCreator<T, C> = (config: CoreConfig) => Params<T, C>;

export type Method<T, C, R> = (request: T, unitConfig?: C) => Promise<R>;

export type MethodResponse = FinalExecutionOutcome | void;

export type MethodCreator<T, C, R> = (config: CoreConfig) => Method<T, C, R>;

export type Utils<T, C> = {
  paramsify: (fn: ParamsCreator<T, C>) => ParamsCreator<T, C>;
  methodify: <R>(fn: MethodCreator<T, C, R>) => MethodCreator<T, C, R>;
};

export type Unit<T, C> = {
  createGetParams: ParamsCreator<T, C>;
  createMethod: MethodCreator<T, C, MethodResponse>;
};

export const createUnit = <T, C>(create: (utils: Utils<T, C>) => Unit<T, C>) => {
  const paramsify = (fn: ParamsCreator<T, C>) => {
    return fn;
  };

  const methodify = <R>(fn: MethodCreator<T, C, R>) => {
    return fn;
  };

  return create({
    paramsify,
    methodify,
  });
};
