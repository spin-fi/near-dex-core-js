import {TransactionManager} from 'near-transaction-manager';
import {transactions} from 'near-api-js';
import {near} from '@spinfi/number';

const GAS = near('50000000000000', true).unwrap();

const METHOD_NAME = 'storage_deposit';

export const createDepositStorageTransaction = async (
  tokenAddress: string,
  transactionManager: TransactionManager,
  minDeposit?: string,
) => {
  return await transactionManager.createTransaction({
    receiverId: tokenAddress,
    actions: [
      transactions.functionCall(
        METHOD_NAME,
        {},
        GAS,
        // @ts-expect-error a minimal value for deposit may not be provided in the first place
        near(minDeposit, true).unwrap(),
      ),
    ],
  });
};
