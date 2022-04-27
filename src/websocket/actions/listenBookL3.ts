import {NotifyConfig} from '@spinfi/websocket';

import {WebsocketConfig} from '../../types';
import {Book} from './listenBookL1';
import {LSide} from '../types';

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
  side: LSide;
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

export const createListenBookL3 = ({websocket}: WebsocketConfig) => {
  return (request: ListenBookL3Request, config?: NotifyConfig<BookL3State, BookL3Notify>) => {
    return websocket.sendNotify([[`${CHANNEL_NAME}|${request.marketId}`]], config);
  };
};
