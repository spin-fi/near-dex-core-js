import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {near} from '@spinfi/number';

import {ContractConfig} from '../../types';

/**
 * @category cancelOrders
 */
export type CancelOrdersResponse = FinalExecutionOutcome;

/**
 * @category cancelOrders
 */
export interface CancelOrdersRequest {
  /**
   * Optional market ID. Orders from all markets would be dropped if not specified
   */
  marketId?: number;
  /**
   * Optional limit for number of orders to be dropped
   */
  limit?: number;
}

/**
 * @category cancelOrders
 */
export interface CancelOrdersConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = near('300000000000000', true).unwrap();

const METHOD_NAME = 'cancel_orders';

export const createCancelOrders = ({account, contractId}: ContractConfig) => {
  return async (
    request?: CancelOrdersRequest,
    config?: CancelOrdersConfig,
  ): Promise<CancelOrdersResponse> => {
    return await account.functionCall({
      contractId,
      methodName: METHOD_NAME,
      args: {
        market_id: request?.marketId,
        limit: request?.limit,
      },
      gas: config?.gas?.toString() ?? GAS,
    });
  };
};
