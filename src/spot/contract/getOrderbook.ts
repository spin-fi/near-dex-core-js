import {invariant} from '@spinfi/shared';

import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

/**
 * @category getOrderbook
 */
export interface OrderbookOrder {
  /**
   * Level price
   */
  price: string;
  /**
   * Total quantity at this level price
   */
  quantity: string;
}

/**
 * @category getOrderbook
 */
export interface GetOrderbookResponse {
  /**
   * List of ask orders grouped by price
   */
  ask_orders?: OrderbookOrder[];
  /**
   * List of bid orders grouped by price
   */
  bid_orders?: OrderbookOrder[];
}

/**
 * @category getOrderbook
 */
export interface GetOrderbookRequest {
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Type of orders to select (case-sensitive). If no value both ask and bids are returned
   */
  orderType?: 'Ask' | 'Bid';
  /**
   * Number of records. Default 15
   */
  limit?: number;
}

const METHOD_NAME = 'get_orderbook';

export const getOrderbook = createView<GetOrderbookRequest, GetOrderbookResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('getOrderbook'));
      invariant(config.contractId, contractIdErrorMessage('getOrderbook'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        market_id: request.marketId,
        order_type: request.orderType,
        limit: request.limit,
      });
    };
  });

  return {
    createMethod,
  };
});
