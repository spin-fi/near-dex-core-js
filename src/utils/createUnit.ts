import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {Config} from '../types';
import {CoreParams} from '../types/selector';

type Params<T, C> = (request: T, unitConfig?: C) => Promise<CoreParams | undefined>;

type ParamsCreator<T, C> = (config: Config) => Params<T, C>;

type Method<T, C, R> = (request: T, unitConfig?: C) => Promise<R>;

type MethodResponse = FinalExecutionOutcome | void;

type MethodCreator<T, C, R> = (config: Config) => Method<T, C, R>;

type Utils<T, C> = {
  paramsify: (fn: ParamsCreator<T, C>) => ParamsCreator<T, C>;
  methodify: <R>(fn: MethodCreator<T, C, R>) => MethodCreator<T, C, R>;
};

type Unit<T, C> = {
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
