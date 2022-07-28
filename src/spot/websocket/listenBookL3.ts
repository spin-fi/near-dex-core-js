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
export interface BookL3Notify {
  /**
   * Change ID of the notification
   */
  id: number;
  /**
   * ID of the market
   */
  market_id: number;
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

export const listenBookL3 = createSocket(({snapshotify}) => {
  const createMethod = snapshotify<ListenBookL3Request, BookL3Notify, BookL3State>((config) => {
    return (request, snapshotConfig) => {
      invariant(config.websocket, websocketErrorMessage('listenBookL3'));

      return config.websocket.sendNotifyWithState(
        [[`${CHANNEL_NAME}|${request.marketId}`]],
        snapshotConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
