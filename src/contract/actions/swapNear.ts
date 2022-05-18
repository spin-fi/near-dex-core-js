import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {near} from '@spinfi/number';

import {ContractConfig} from '../../types';

/**
 * @category swapNear
 */
export type SwapNearResponse = FinalExecutionOutcome;

/**
 * @category swapNear
 */
export interface SwapNearRequest {
  /**
   * Market identifier to exchange
   */
  marketId: number;
  /**
   * Market order stop price
   */
  price: BigInt;
  /**
   * Amount in decimal
   */
  amount: BigInt;
}

/**
 * @category swapNear
 */
export interface SwapNearConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = near('300000000000000', true).unwrap();

const DEPOSIT = BigInt(1);

const METHOD_NAME = 'swap_near';

export const createSwapNear = ({account, contractId}: ContractConfig) => {
  return async (request: SwapNearRequest, config?: SwapNearConfig): Promise<SwapNearResponse> => {
    return await account.functionCall({
      contractId,
      methodName: METHOD_NAME,
      args: {
        swap: {
          market_id: request.marketId,
          price: request.price.toString(),
        },
      },
      gas: config?.gas?.toString() ?? GAS,
      attachedDeposit: (BigInt(request.amount.toString()) + DEPOSIT).toString(),
    });
  };
};
