import {invariant} from '@spinfi/shared';

import {Config, WebsocketConfig} from '../types';
import {WEBSCOKET_MESSAGE} from './consts';

export const createSyncWebsocketWrapper = ({websocket}: Config) => {
  return <T extends any[], R>(create: (config: WebsocketConfig) => (...args: T) => R) => {
    return (...args: T) => {
      invariant(websocket, WEBSCOKET_MESSAGE);

      const action = create({
        websocket,
      });

      return action(...args);
    };
  };
};
