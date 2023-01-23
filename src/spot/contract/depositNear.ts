import {invariant} from '@spinfi/shared';
import type {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import type {Transaction} from 'near-api-js/lib/transaction';

import {selectorErrorMessage} from './messages';
import {createUnit} from '../../utils/createUnit';

/**
 * @category depositNear
 */
export type DepositNearResponse = FinalExecutionOutcome | void;

/**
 * @category depositNear
 */
export interface DepositNearRequest {
  /**
   * Amount in decimal
   */
  amount: BigInt;
}

/**
 * @category depositNear
 */
export type DepositNearFactoryResponse = Transaction;

/**
 * @category depositNear
 */
export interface DepositNearConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = '280000000000000';

const METHOD_NAME = 'deposit_near';

export const depositNear = createUnit<DepositNearRequest, DepositNearConfig>(
  ({paramsify, methodify}) => {
    const createGetParams = paramsify(() => {
      return async (request, unitConfig) => {
        return {
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: METHOD_NAME,
                args: {},
                gas: unitConfig?.gas?.toString() ?? GAS,
                deposit: request.amount.toString(),
              },
            },
          ],
        };
      };
    });

    const createMethod = methodify((config) => {
      const getParams = createGetParams(config);

      return async (request, unitConfig): Promise<DepositNearResponse> => {
        invariant(config.selector, selectorErrorMessage('depositNear'));

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
  },
);
