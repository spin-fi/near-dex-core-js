import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {selectorErrorMessage} from './messages';
import {createUnit} from '../../utils/createUnit';

/**
 * @category swapNear
 */
export type SwapNearResponse = FinalExecutionOutcome | void;

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

const GAS = '280000000000000';

const DEPOSIT = BigInt(1);

const METHOD_NAME = 'swap_near';

export const swapNear = createUnit<SwapNearRequest, SwapNearConfig>(({paramsify, methodify}) => {
  const createGetParams = paramsify(() => {
    return async (request, unitConfig) => {
      return {
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName: METHOD_NAME,
              args: {
                swap: {
                  market_id: request.marketId,
                  price: request.price.toString(),
                },
              },
              gas: unitConfig?.gas?.toString() ?? GAS,
              deposit: (BigInt(request.amount.toString()) + DEPOSIT).toString(),
            },
          },
        ],
      };
    };
  });

  const createMethod = methodify((config) => {
    const getParams = createGetParams(config);

    return async (request, unitConfig): Promise<SwapNearResponse> => {
      invariant(config.selector, selectorErrorMessage('swapNear'));

      const wallet = await config.selector.wallet();
      const params = await getParams(request, unitConfig);

      if (!params) {
        return;
      }

      return await wallet.signAndSendTransaction(params);
    };
  });

  return {
    createGetParams,
    createMethod,
  };
});
