import {invariant} from '@spinfi/shared';
import {nanoid} from 'nanoid';

import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category ping
 */
export type PingResponse = 'pong';

const METHOD_NAME = 'ping';

export const ping = createSocket(({methodify}) => {
  const createMethod = methodify<void, PingResponse>((config) => {
    return (_, methodConfig) => {
      invariant(config.websocket, websocketErrorMessage('ping'));

      return config.websocket.sendMethod(
        {
          method: METHOD_NAME,
          id: nanoid(),
          params: [],
        },
        methodConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
