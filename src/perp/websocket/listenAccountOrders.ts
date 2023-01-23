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
  created_at: string;
  updated_at: string;
}

/**
 * @category listenAccountOrders
 */
export type AccountOrdersState = OrderInfo[];

/**
 * @category listenAccountOrders
 */
export type AccountOrdersNotify = Omit<OrderInfo, 'created_at' | 'updated_at'> & {
  /**
   * Order creation and update timestamp in nanoseconds (1 second = 1 * 10^9 nanosecond)
   */
  ts?: string;
};

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

export const listenAccountOrders = createSocket(({statify}) => {
  const createMethod = statify<ListenAccountOrdersRequest, AccountOrdersState, AccountOrdersNotify>(
    (outerConfig) => {
      return (request, innerConfig) => {
        invariant(outerConfig.websocket, websocketErrorMessage('listenAccountOrders'));

        return outerConfig.websocket.statify(
          {
            params: [[`${CHANNEL_NAME}|${request.accountId}`]],
          },
          innerConfig,
        );
      };
    },
  );

  return {
    createMethod,
  };
});
