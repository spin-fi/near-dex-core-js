import {invariant} from '@spinfi/shared';

import {Book} from './listenBookL1';
import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category listenBookL2
 */
export type BookL2Notify = Book;

/**
 * @category listenBookL2
 */
export interface ListenBookL2Request {
  /**
   * Market ID
   */
  marketId: number;
  /**
   * The number of entries to return for bids and asks
   */
  depth: number;
}

const CHANNEL_NAME = 'bookL2';

export const listenBookL2 = createSocket(({notify}) => {
  const createMethod = notify<ListenBookL2Request, BookL2Notify>((outerConfig) => {
    return (request, innerConfig) => {
      invariant(outerConfig.websocket, websocketErrorMessage('listenBookL2'));

      return outerConfig.websocket.notify(
        {
          params: [[`${CHANNEL_NAME}|${request.marketId}|${request.depth}`]],
        },
        innerConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
