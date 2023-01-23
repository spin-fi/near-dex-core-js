import {invariant} from '@spinfi/shared';

import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category listenOrders
 */
export const enum OrderInfoStatus {
  new = 'new',
  filled = 'filled',
  partially_filled = 'partially_filled',
  cancelled = 'cancelled',
  expired = 'expired',
}

/**
 * @category listenOrders
 */
export interface OrderInfo {
  /**
   * Order owner near account ID
   */
  account_id: string;
  /**
   * Average price of the order match. 0 if the order hasn't yet been filled at all
   */
  average_price: string;
  /**
   * Block number in which the transaction was added
   */
  block_number: number;
  /**
   * Custom order ID. Optionally set by the user when order placing
   */
  client_order_id: string | null;
  /**
   * Market ID
   */
  market_id: number;
  /**
   * Order ID. Set by contract. Unique identificator among all orders
   */
  order_id: string;
  /**
   * Limit price of the order in the quote currency
   */
  price: string;
  /**
   * Initial quantity of the order in base currency
   */
  quantity: string;
  /**
   * Remaining order quantity to be executed in base currency
   */
  remaining: string;
  /**
   * TODO
   */
  side: 'ask' | 'bid';
  /**
   * TODO
   */
  status: OrderInfoStatus;
  /**
   * Order creation timestamp in nanoseconds (1 second = 1 * 10^9 nanosecond)
   */
  created_at?: string;
  /**
   * Last order update timestamp in nanoseconds (1 second = 1 * 10^9 nanosecond)
   */
  updated_at?: string;
  /**
   * TODO
   */
  txn_hash: string;
}

/**
 * @category listenOrders
 */
export type OrdersNotify = OrderInfo;

/**
 * @category listenOrders
 */
export interface ListenOrdersRequest {
  /**
   * Market ID
   */
  marketId: number;
}

const CHANNEL_NAME = 'orders';

export const listenOrders = createSocket(({notify}) => {
  const createMethod = notify<ListenOrdersRequest, OrdersNotify>((outerConfig) => {
    return (request, innerConfig) => {
      invariant(outerConfig.websocket, websocketErrorMessage('listenOrders'));

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
