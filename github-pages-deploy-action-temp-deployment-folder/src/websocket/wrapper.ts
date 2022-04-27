import {invariant, responsifyAsync, responsifySync} from '@spinfi/shared';

import {Config, WebsocketConfig} from '../types';
import {WEBSCOKET_MESSAGE} from './consts';

export const createAsyncWebsocketWrapper = ({websocket}: Config) => {
  return <T extends any[], R>(create: (config: WebsocketConfig) => (...args: T) => Promise<R>) => {
    return responsifyAsync((...args: T) => {
      invariant(websocket, WEBSCOKET_MESSAGE);
      const action = create({websocket});
      return action(...args);
    });
  };
};

export const createSyncWebsocketWrapper = ({websocket}: Config) => {
  return <T extends any[], R>(create: (config: WebsocketConfig) => (...args: T) => R) => {
    return responsifySync((...args: T) => {
      invariant(websocket, WEBSCOKET_MESSAGE);
      const action = create({websocket});
      return action(...args);
    });
  };
};
