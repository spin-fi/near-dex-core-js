import {guardNull, isNear} from '@spinfi/shared';
import {Transaction} from 'near-api-js/lib/transaction';

import {NativeConfig} from '../../types';
import {createGetBalanceStorage} from './getBalanceStorage';
import {createDepositStorageFactory} from './depositStorage';
import {createGetBalanceStorageBounds} from './getBalanceStorageBounds';

/**
 * @category checkDepositStorage
 */
export interface CheckDepositStorageRequest {
  /**
   * TODO
   */
  tokenAddress: string;
}

/**
 * @category checkDepositStorage
 */
export type CheckDepositStorageFactoryResponse = Transaction[];

export const createCheckDepositStorageFactory = (config: NativeConfig) => {
  const getBalanceStorage = createGetBalanceStorage(config);
  const getBalanceStorageBounds = createGetBalanceStorageBounds(config);
  const depositStorageFactory = createDepositStorageFactory(config);

  return async (
    request: CheckDepositStorageRequest,
  ): Promise<CheckDepositStorageFactoryResponse> => {
    const transactionList: Transaction[] = [];

    if (!isNear(request.tokenAddress)) {
      const balanceStorage = await getBalanceStorage(request);

      if (guardNull(balanceStorage)) {
        const storageBalanceBounds = await getBalanceStorageBounds(request);

        const depositStorageTransaction = await depositStorageFactory({
          tokenAddress: request.tokenAddress,
          minDeposit: storageBalanceBounds?.min,
        });

        transactionList.push(depositStorageTransaction);
      }
    }

    return transactionList;
  };
};
