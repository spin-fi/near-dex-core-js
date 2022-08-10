import {NotifyConfig, NotifyWithStateConfig, MethodConfig} from '@spinfi/websocket';
import {Subscription} from 'rxjs';

import {CoreConfig} from '../types';

type Notification<T, N> = (request: T, notificationConfig?: NotifyConfig<N>) => Subscription;

type NotificationCreator<T, N> = (config: CoreConfig) => Notification<T, N>;

type Snapshot<T, N, S> = (request: T, snapshotConfig?: NotifyWithStateConfig<S, N>) => Subscription;

type SnapshotCreator<T, N, S> = (config: CoreConfig) => Snapshot<T, N, S>;

type Method<T, R> = (request: T, methodConfig?: MethodConfig<R>) => Subscription;

type MethodCreator<T, R> = (config: CoreConfig) => Method<T, R>;

type Utils = {
  notify: <T, N>(fn: NotificationCreator<T, N>) => NotificationCreator<T, N>;
  snapshotify: <T, N, S>(fn: SnapshotCreator<T, N, S>) => SnapshotCreator<T, N, S>;
  methodify: <T, R>(fn: MethodCreator<T, R>) => MethodCreator<T, R>;
};

export const createSocket = <T>(create: (utils: Utils) => T): T => {
  const notify = <T, N>(fn: NotificationCreator<T, N>) => {
    return fn;
  };

  const snapshotify = <T, N, S>(fn: SnapshotCreator<T, N, S>) => {
    return fn;
  };

  const methodify = <T, R>(fn: MethodCreator<T, R>) => {
    return fn;
  };

  return create({
    notify,
    snapshotify,
    methodify,
  });
};
