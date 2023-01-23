import {ConfigCall, ConfigNotify, ConfigStatify} from '@spinfi/websocket';
import {Subscription} from 'rxjs';

import {CoreConfig} from '../types';

type Corify<T> = (config: CoreConfig) => T;

type Callify<T, R> = Corify<(request: T, config?: ConfigCall<R>) => Subscription>;

type Notify<T, R> = Corify<(request: T, config?: ConfigNotify<R>) => Subscription>;

type Statify<T, R, S> = Corify<(request: T, config?: ConfigStatify<R, S>) => Subscription>;

type Utils = {
  callify: <T, R>(fn: Callify<T, R>) => Callify<T, R>;
  notify: <T, R>(fn: Notify<T, R>) => Notify<T, R>;
  statify: <T, R, S>(fn: Statify<T, R, S>) => Statify<T, R, S>;
};

export const createSocket = <T>(create: (utils: Utils) => T): T => {
  return create({
    callify: <T, R>(fn: Callify<T, R>) => {
      return fn;
    },
    notify: <T, R>(fn: Notify<T, R>) => {
      return fn;
    },
    statify: <T, R, S>(fn: Statify<T, R, S>) => {
      return fn;
    },
  });
};
