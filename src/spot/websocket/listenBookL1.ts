import {invariant} from '@spinfi/shared';

import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category listenBookL1
 */
export type BookNode = [string, string];

/**
 * @category listenBookL1
 */
export interface Book {
  price_nodes: {
    /**
     * [price, quantity] tuples arrayy
     */
    asks: BookNode[];
    /**
     * [price, quantity] tuples arrayy
     */
    bids: BookNode[];
  };
  /**
   * Timestamp in nanoseconds (1 second = 1 * 10^9 nanosecond)
   */
  ts: string;
}

/**
 * @category listenBookL1
 */
export type BookL1Notify = Book;

/**
 * @category listenBookL1
 */
export interface ListenBookL1Request {
  /**
   * Market ID
   */
  marketId: number;
}

const CHANNEL_NAME = 'bookL1';

export const listenBookL1 = createSocket(({notify}) => {
  const createMethod = notify<ListenBookL1Request, BookL1Notify>((outerConfig) => {
    return (request, innerConfig) => {
      invariant(outerConfig.websocket, websocketErrorMessage('listenBookL1'));

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
