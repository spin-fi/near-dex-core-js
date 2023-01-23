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
}

const METHOD_NAME = 'get_orderbook';

export const getOrderbook = createView<GetOrderbookRequest, GetOrderbookResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('getOrderbook'));
      invariant(config.contractId, contractIdErrorMessage('getOrderbook'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        market_id: request.marketId,
      });
    };
  });

  return {
    createMethod,
  };
});
