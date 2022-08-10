import {invariant, isNear} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {selectorErrorMessage} from './messages';
import {getBalanceStorage} from './getBalanceStorage';
import {getBalanceStorageBounds} from './getBalanceStorageBounds';
import {createUnit} from '../utils/createUnit';

/**
 * @category depositStorage
 */
export interface DepositStorageRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Token address
   */
  tokenAddress: string;
}

/**
 * @category depositStorage
 */
export type DepositStorageResponse = FinalExecutionOutcome | void;

/**
 * @category depositStorage
 */
export interface DepositStorageConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = '50000000000000';

const DEPOSIT = '1';

const METHOD_NAME = 'storage_deposit';

export const depositStorage = createUnit<DepositStorageRequest, DepositStorageConfig>(
  ({paramsify, methodify}) => {
    const createCheckIsAvailable = methodify((config) => {
      const getBalanceStorageMethod = getBalanceStorage.createMethod(config);

      return async (request) => {
        if (isNear(request.tokenAddress)) {
          return false;
        }

        const balanceStorage = await getBalanceStorageMethod({
          accountId: request.accountId,
          tokenAddress: request.tokenAddress,
        });

        return balanceStorage === null;
      };
    });

    const createGetParams = paramsify((config) => {
      const checkIsAvailable = createCheckIsAvailable(config);
      const getBalanceStorageBoundsMethod = getBalanceStorageBounds.createMethod(config);

      return async (request, unitConfig) => {
        const isAvailable = await checkIsAvailable(request);

        if (!isAvailable) {
          return;
        }

        const storageBounds = await getBalanceStorageBoundsMethod({
          tokenAddress: request.tokenAddress,
        });

        return {
          receiverId: request.tokenAddress,
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: METHOD_NAME,
                args: {
                  registration_only: true,
                },
                gas: unitConfig?.gas?.toString() ?? GAS,
                deposit: storageBounds?.min ?? DEPOSIT,
              },
            },
          ],
        };
      };
    });

    const createMethod = methodify((config) => {
      const getParams = createGetParams(config);
      const checkIsAvailable = createCheckIsAvailable(config);

      return async (request, unitConfig): Promise<DepositStorageResponse> => {
        const isAvailable = await checkIsAvailable(request);

        if (!isAvailable) {
          return;
        }

        invariant(config.selector, selectorErrorMessage('depositStorage'));

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
