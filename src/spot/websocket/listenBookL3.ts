import {invariant} from '@spinfi/shared';

import {Book} from './listenBookL1';
import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category listenBookL3
 */
export type BookL3State = Book;

/**
 * @category listenBookL3
 */
export interface BookL3NotifyItem {
  /**
   * Level price inside orderbook
   */
  price: string;
  /**
   * Absolutely quantity for a given price level
   */
  quantity: string;
  /**
   * TODO
   */
  side: 'ask' | 'bid';
}

/**
 * @category listenBookL3
 */
export interface BookL3Notify {
  /**
   * ID of the market
   */
  market_id: number;
  /**
   * TODO
   */
  price_node_changes: BookL3NotifyItem[];
  /**
   * Timestamp in nanoseconds (1 second = 1 * 10^9 nanosecond)
   */
  ts: string;
}

/**
 * @category listenBookL3
 */
export interface ListenBookL3Request {
  /**
   * Market ID
   */
  marketId: number;
}

const CHANNEL_NAME = 'bookL3';

export const listenBookL3 = createSocket(({statify}) => {
  const createMethod = statify<ListenBookL3Request, BookL3State, BookL3Notify>((outerConfig) => {
    return (request, innerConfig) => {
      invariant(outerConfig.websocket, websocketErrorMessage('listenBookL3'));

      return outerConfig.websocket.statify(
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
