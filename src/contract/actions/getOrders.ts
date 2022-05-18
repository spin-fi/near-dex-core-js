import {ContractConfig} from '../../types';
import {Order} from './getOrder';

/**
 * @category getOrders
 */
export type GetOrdersResponse = Order[];

/**
 * @category getOrders
 */
export interface GetOrdersRequest {
  /**
   * Market ID
   */
  marketId: number;
}

const METHOD_NAME = 'get_orders';

export const createGetOrders = ({account, contractId}: ContractConfig) => {
  return async (request: GetOrdersRequest): Promise<GetOrdersResponse> => {
    return await account.viewFunction(contractId, METHOD_NAME, {
      market_id: request.marketId,
      account_id: account.accountId,
    });
  };
};
