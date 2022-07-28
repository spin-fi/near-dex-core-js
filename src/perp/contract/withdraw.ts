import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {selectorErrorMessage} from './messages';
import {createUnit} from '../../utils/createUnit';

/**
 * @category withdraw
 */
export type WithdrawResponse = FinalExecutionOutcome | void;

/**
 * @category withdraw
 */
export interface WithdrawRequest {
  /**
   * Could be near.near for native NEAR withdrawal or any Fungible Token currency existing on contract market
   */
  tokenAddress: string;
  /**
   * Transfer amount
   */
  amount: BigInt;
}

/**
 * @category withdraw
 */
export interface WithdrawConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
  /**
   * Deposit in decimal
   */
  deposit?: BigInt;
}

const GAS = '50000000000000';

const DEPOSIT = '1';

const METHOD_NAME = 'withdraw';

export const withdraw = createUnit<WithdrawRequest, WithdrawConfig>(({paramsify, methodify}) => {
  const createGetParams = paramsify(() => {
    return async (request, unitConfig) => {
      return {
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName: METHOD_NAME,
              args: {
                token: request.tokenAddress,
                amount: request.amount.toString(),
              },
              gas: unitConfig?.gas?.toString() ?? GAS,
              deposit: unitConfig?.deposit?.toString() ?? DEPOSIT,
            },
          },
        ],
      };
    };
  });

  const createMethod = methodify((config) => {
    const getParams = createGetParams(config);

    return async (request, unitConfig): Promise<WithdrawResponse> => {
      invariant(config.selector, selectorErrorMessage('withdraw'));

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
