import {invariant, guardNumber} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {createUnit} from '../../utils/createUnit';
import {selectorErrorMessage} from './messages';
import {storageGetStorage} from './storageGetStorage';

export interface StorageDepositRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Deposit amount
   */
  amount: BigInt;
}

export type StorageDepositResponse = FinalExecutionOutcome | void;

export interface StorageDepositConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = '50000000000000';

const METHOD_NAME = 'storage_deposit';

export const storageDeposit = createUnit<StorageDepositRequest, StorageDepositConfig>(
  ({paramsify, methodify}) => {
    const createCheckIsAvailable = methodify((config) => {
      const getStorageMethod = storageGetStorage.createMethod(config);

      return async (request) => {
        const balanceStorage = await getStorageMethod({
          accountId: request.accountId,
        });

        const amount = balanceStorage?.available_amount;
        return guardNumber(amount) ? amount <= 0 : true;
      };
    });

    const createGetParams = paramsify((config) => {
      const checkIsAvailable = createCheckIsAvailable(config);

      return async (request, unitConfig) => {
        const isAvailable = await checkIsAvailable(request);

        if (!isAvailable) {
          return;
        }

        return {
          receiverId: config.contractId,
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: METHOD_NAME,
                args: {
                  account_id: request.accountId,
                },
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
      const checkIsAvailable = createCheckIsAvailable(config);

      return async (request, unitConfig): Promise<StorageDepositResponse> => {
        const isAvailable = await checkIsAvailable(request);

        if (!isAvailable) {
          return;
        }

        invariant(config.selector, selectorErrorMessage('storageDeposit'));

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
