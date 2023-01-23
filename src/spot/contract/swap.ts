import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {isNear} from '@spinfi/shared';

import {swapNear} from './swapNear';
import {swapFt} from './swapFt';
import {createUnit} from '../../utils/createUnit';

/**
 * @category swap
 */
export type SwapResponse = FinalExecutionOutcome | void;

/**
 * @category swap
 */
export interface SwapRequest {
  /**
   * Market identifier to exchange
   */
  marketId: number;
  /**
   * Token Address From
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
  /**
   * Deadline
   */
  deadline?: string;
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
  deposit?: BigInt;
}

export const swap = createUnit<SwapRequest, SwapConfig>(({paramsify, methodify}) => {
  const createGetParams = paramsify((config) => {
    const getSwapNearParams = swapNear.createGetParams(config);
    const getSwapFtParams = swapFt.createGetParams(config);

    return async (request, unitConfig) => {
      if (isNear(request.tokenAddress)) {
        return await getSwapNearParams(request, unitConfig);
      } else {
        return await getSwapFtParams(request, unitConfig);
      }
    };
  });

  const createMethod = methodify((config) => {
    const swapNearMethod = swapNear.createMethod(config);
    const swapFtMethod = swapFt.createMethod(config);

    return async (request, unitConfig): Promise<SwapResponse> => {
      if (isNear(request.tokenAddress)) {
        return await swapNearMethod(request, unitConfig);
      } else {
        return await swapFtMethod(request, unitConfig);
      }
    };
  });

  return {
    createGetParams,
    createMethod,
  };
});
