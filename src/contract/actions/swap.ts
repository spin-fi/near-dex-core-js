import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {isNear} from '@spinfi/shared';

import {ContractConfig} from '../../types';
import {createSwapNear} from './swapNear';
import {createSwapFt} from './swapFt';

/**
 * @category swap
 */
export type SwapResponse = FinalExecutionOutcome;

/**
 * @category swap
 */
export interface SwapRequest {
  /**
   * Market identifier to exchange
   */
  marketId: number;
  /**
   * Token Address
   */
  tokenAddress: string;
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
 * @category swap
 */
export interface SwapConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
  /**
   * Attached Deposit in decimal
   */
  attachedDeposit?: BigInt;
}

export const createSwap = (config: ContractConfig) => {
  const swapNear = createSwapNear(config);
  const swapFt = createSwapFt(config);

  return async (request: SwapRequest, config?: SwapConfig): Promise<SwapResponse> => {
    if (isNear(request.tokenAddress)) {
      return await swapNear(request, config);
    } else {
      return await swapFt(request, config);
    }
  };
};
