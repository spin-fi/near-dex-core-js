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
  const createMethod = notify<ListenBookL2Request, BookL2Notify>((config) => {
    return (request, notificationConfig) => {
      invariant(config.websocket, websocketErrorMessage('listenBookL2'));

      return config.websocket.sendNotify(
        [[`${CHANNEL_NAME}|${request.marketId}|${request.depth}`]],
        notificationConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
