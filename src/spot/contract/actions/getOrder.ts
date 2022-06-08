import {ContractConfig} from '../../types';
import {USide} from '../types';

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
  o_type: USide;
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
   * Market ID
   */
  marketId: number;
  /**
   * Order ID
   */
  orderId: string;
}

const METHOD_NAME = 'get_order';

export const createGetOrder = ({account, contractId}: ContractConfig) => {
  return async (request: GetOrderRequest): Promise<GetOrderResponse> => {
    return await account.viewFunction(contractId, METHOD_NAME, {
      market_id: request.marketId,
      order_id: request.orderId,
      account_id: account.accountId,
    });
  };
};
