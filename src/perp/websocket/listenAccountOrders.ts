import {invariant} from '@spinfi/shared';

import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category listenAccountOrders
 */
export interface OrderInfo {
  account_id: string;
  average_price: string;
  block_number: number;
  client_order_id: string | null;
  market_id: number;
  order_id: string;
  price: string;
  quantity: string;
  remaining: string;
  side: 'ask' | 'bid';
  status: 'new' | 'filled' | 'partially_filled' | 'cancelled' | 'expired';
  txn_hash: string;
  ts: string;
}

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
