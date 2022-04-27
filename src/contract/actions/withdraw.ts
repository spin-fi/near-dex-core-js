import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {transactions} from 'near-api-js';
import {near} from '@spinfi/number';
import {guardNull} from '@spinfi/shared';

import {ContractConfig} from '../../types';
import {createGetBalanceStorage} from '../../native/actions/getBalanceStorage';
import {createDepositStorageTransaction} from '../../native/actions/depositStorage';
import {isNear} from '../../utils';

/**
 * @category withdraw
 */
export type WithdrawResponse = FinalExecutionOutcome[];

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
  /**
   * With storage check/deposit flag
   */
  noStorageCheck?: boolean;
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
   * Near deposit in decimal
   */
  nearDeposit?: BigInt;
  /**
   * Ft deposit in decimal
   */
  ftDeposit?: BigInt;
}

const GAS = near('50000000000000', true).unwrap();

const NEAR_DEPOSIT = near('0', true).unwrap();

const FT_DEPOSIT = near('1', true).unwrap();

const METHOD_NAME = 'withdraw';

export const createWithdraw = (config: ContractConfig) => {
  const {transactionManager, contractId} = config;
  const getBalanceStorage = createGetBalanceStorage(config);

  return async (request: WithdrawRequest, config?: WithdrawConfig): Promise<WithdrawResponse> => {
    const transactionList = [];

    if (!isNear(request.tokenAddress) && !request.noStorageCheck) {
      const balanceStorage = await getBalanceStorage(request);

      if (guardNull(balanceStorage)) {
        const depositStorageTransaction = await createDepositStorageTransaction(
          request.tokenAddress,
          transactionManager,
        );
        transactionList.push(depositStorageTransaction);
      }
    }

    const withdrawTransaction = await transactionManager.createTransaction({
      receiverId: contractId,
      actions: [
        transactions.functionCall(
          METHOD_NAME,
          {
            token: request.tokenAddress,
            amount: request.amount.toString(),
          },
          config?.gas?.toString() ?? GAS,
          isNear(request.tokenAddress)
            ? config?.nearDeposit?.toString() ?? NEAR_DEPOSIT
            : config?.ftDeposit?.toString() ?? FT_DEPOSIT,
        ),
      ],
    });
    transactionList.push(withdrawTransaction);

    return await transactionManager.bundleCreateSignAndSendTransactions(transactionList);
  };
};
