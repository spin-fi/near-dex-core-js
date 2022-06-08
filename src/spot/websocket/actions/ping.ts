import {nanoid} from 'nanoid';
import {MethodConfig} from '@spinfi/websocket';

import {WebsocketConfig} from '../../types';

/**
 * @category ping
 */
export type PingResponse = 'pong';

const METHOD_NAME = 'ping';

export const createPing = ({websocket}: WebsocketConfig) => {
  return (config?: MethodConfig<PingResponse>) => {
    return websocket.sendMethod(
      {
        method: METHOD_NAME,
        id: nanoid(),
        params: [],
      },
      config,
    );
  };
};
