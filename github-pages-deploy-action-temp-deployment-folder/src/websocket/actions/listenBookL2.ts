import {NotifyConfig} from '@spinfi/websocket';

import {WebsocketConfig} from '../../types';
import {Book} from './listenBookL1';

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

export const createListenBookL2 = ({websocket}: WebsocketConfig) => {
  return (request: ListenBookL2Request, config?: NotifyConfig<void, BookL2Notify>) => {
    return websocket.sendNotify([[`${CHANNEL_NAME}|${request.marketId}|${request.depth}`]], config);
  };
};
