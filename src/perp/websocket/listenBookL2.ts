import {invariant} from '@spinfi/shared';

import {BookNode} from './listenBookL1';
import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category listenBookL2
 */
export interface BookL2Notify {
  price_nodes: {
    asks: BookNode[];
    bids: BookNode[];
  };
  ts: string;
}

/**
 * @category listenBookL2
 */
export interface ListenBookL2Request {
  /**
   * Market ID
   */
  marketId: number;
}

const CHANNEL_NAME = 'bookL2';

export const listenBookL2 = createSocket(({notify}) => {
  const createMethod = notify<ListenBookL2Request, BookL2Notify>((outerConfig) => {
    return (request, innerConfig) => {
      invariant(outerConfig.websocket, websocketErrorMessage('listenBookL2'));

      return outerConfig.websocket.notify(
        {
          params: [[`${CHANNEL_NAME}|${request.marketId}`]],
        },
        innerConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
