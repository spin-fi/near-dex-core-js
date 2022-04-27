import {NotifyConfig} from '@spinfi/websocket';

import {WebsocketConfig} from '../../types';

/**
 * @category listenBookL1
 */
export type BookNode = [string, string];

/**
 * @category listenBookL1
 */
export interface Book {
  /**
   * [price, quantity] tuples arrayy
   */
  asks: BookNode[];
  /**
   * [price, quantity] tuples arrayy
   */
  bids: BookNode[];
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

export const createListenBookL1 = ({websocket}: WebsocketConfig) => {
  return (request: ListenBookL1Request, config?: NotifyConfig<void, BookL1Notify>) => {
    return websocket.sendNotify([[`${CHANNEL_NAME}|${request.marketId}`]], config);
  };
};
