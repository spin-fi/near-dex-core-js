import {invariant} from '@spinfi/shared';

import {Order} from './getOrder';
import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

/**
 * @category getOrders
 */
export type GetOrdersResponse = Order[];

/**
 * @category getOrders
 */
export interface GetOrdersRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Market ID
   */
  marketId: number;
}

const METHOD_NAME = 'get_orders';

export const getOrders = createView<GetOrdersRequest, GetOrdersResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('getOrders'));
      invariant(config.contractId, contractIdErrorMessage('getOrders'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        market_id: request.marketId,
        account_id: request.accountId,
      });
    };
  });

  return {
    createMethod,
  };
});
