import {transactions} from 'near-api-js';
import {Transaction} from 'near-api-js/lib/transaction';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {near} from '@spinfi/number';
import {head} from '@spinfi/shared';

import {NativeConfig} from '../../types';

/**
 * @category depositStorage
 */
export interface DepositStorageRequest {
  /**
   * TODO
   */
  tokenAddress: string;
  /**
   * TODO
   */
  minDeposit?: string;
}

/**
 * @category depositStorage
 */
export type DepositStorageResponse = FinalExecutionOutcome;

/**
 * @category depositStorage
 */
export type DepositStorageFactoryResponse = Transaction;

/**
 * @category depositStorage
 */
export interface DepositStorageConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = near('50000000000000', true).unwrap();

const ATTACHED_DEPOSIT = near('1', true).unwrap();

const METHOD_NAME = 'storage_deposit';

export const createDepositStorageFactory = ({transactionManager}: NativeConfig) => {
  return async (
    request: DepositStorageRequest,
    config?: DepositStorageConfig,
  ): Promise<DepositStorageFactoryResponse> => {
    return await transactionManager.createTransaction({
      receiverId: request.tokenAddress,
      actions: [
        transactions.functionCall(
          METHOD_NAME,
          {},
          config?.gas?.toString() ?? GAS,
          // A minimal value for deposit may not be provided in the first place
          near(request.minDeposit ?? ATTACHED_DEPOSIT, true).unwrap(),
        ),
      ],
    });
  };
};

export const createDepositStorage = (config: NativeConfig) => {
  const {transactionManager} = config;
  const depositStorageFactory = createDepositStorageFactory(config);

  return async (
    request: DepositStorageRequest,
    config?: DepositStorageConfig,
  ): Promise<DepositStorageResponse> => {
    const transaction = await depositStorageFactory(request, config);
    const response = await transactionManager.bundleCreateSignAndSendTransactions([transaction]);
    return head(response)!;
  };
};
