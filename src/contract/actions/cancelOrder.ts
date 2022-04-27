import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {near} from '@spinfi/number';

import {ContractConfig} from '../../types';

/**
 * @category cancelOrder
 */
export type CancelOrderResponse = FinalExecutionOutcome;

/**
 * @category cancelOrder
 */
export interface CancelOrderRequest {
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Order ID
   */
  orderId: string;
}

/**
 * @category cancelOrder
 */
export interface CancelOrderConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = near('300000000000000', true).unwrap();

const METHOD_NAME = 'cancel_order';

export const createCancelOrder = ({account, contractId}: ContractConfig) => {
  return async (
    request: CancelOrderRequest,
    config?: CancelOrderConfig,
  ): Promise<CancelOrderResponse> => {
    return await account.functionCall({
      contractId,
      methodName: METHOD_NAME,
      args: {
        market_id: request.marketId,
        order_id: request.orderId,
      },
      gas: config?.gas?.toString() ?? GAS,
    });
  };
};
