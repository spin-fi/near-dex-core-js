import {ContractConfig} from '../../types';
import {USide} from '../types';

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
  orderType?: USide;
  /**
   * Number of records. Default 15
   */
  limit?: number;
}

const METHOD_NAME = 'get_orderbook';

export const createGetOrderbook = ({account, contractId}: ContractConfig) => {
  return async (request: GetOrderbookRequest): Promise<GetOrderbookResponse> => {
    return await account.viewFunction(contractId, METHOD_NAME, {
      market_id: request.marketId,
      order_type: request.orderType,
      limit: request.limit,
    });
  };
};
