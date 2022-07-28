import {invariant} from '@spinfi/shared';

import {OrderInfo} from './listenOrders';
import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category listenAccountOrders
 */
export type AccountOrdersState = OrderInfo[];

/**
 * @category listenAccountOrders
 */
export type AccountOrdersNotify = OrderInfo;

/**
 * @category listenAccountOrders
 */
export interface ListenAccountOrdersRequest {
  /**
   * Account ID
   */
  accountId: string;
}

const CHANNEL_NAME = 'account|orders';

export const listenAccountOrders = createSocket(({snapshotify}) => {
  const createMethod = snapshotify<
    ListenAccountOrdersRequest,
    AccountOrdersNotify,
    AccountOrdersState
  >((config) => {
    return (request, snapshotConfig) => {
      invariant(config.websocket, websocketErrorMessage('listenAccountOrders'));

      return config.websocket.sendNotifyWithState(
        [[`${CHANNEL_NAME}|${request.accountId}`]],
        snapshotConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
