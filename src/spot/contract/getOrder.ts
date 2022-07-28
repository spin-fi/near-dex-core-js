import {invariant} from '@spinfi/shared';

import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

/**
 * @category getOrder
 */
export interface Order {
  /**
   * Order ID
   */
  id: string;
  /**
   * Account ID of the order owner
   */
  acc: string;
  /**
   * Price of a order
   */
  price: string;
  /**
   * Average price of a order
   */
  average_price: string;
  /**
   * Quantity of items in order
   */
  quantity: string;
  /**
   * Remaining quantity
   */
  remaining: string;
  /**
   * Timestamp of the last modification of the order
   */
  updated_at: string;
  /**
   * Timestamp of the order creation
   */
  created_at: string;
  /**
   * The timestamp of the order expiration
   */
  expiration_time: string;
  /**
   * Order type
   */
  o_type: 'Ask' | 'Bid';
  /**
   * Optional non-unique client order ID
   */
  client_order_id: number;
}

/**
 * @category getOrder
 */
export type GetOrderResponse = Order;

/**
 * @category getOrder
 */
export interface GetOrderRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Order ID
   */
  orderId: string;
}

const METHOD_NAME = 'get_order';

export const getOrder = createView<GetOrderRequest, GetOrderResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('getOrder'));
      invariant(config.contractId, contractIdErrorMessage('getOrder'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        market_id: request.marketId,
        order_id: request.orderId,
        account_id: request.accountId,
      });
    };
  });

  return {
    createMethod,
  };
});
