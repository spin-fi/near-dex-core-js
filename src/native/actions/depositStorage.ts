import {TransactionManager} from 'near-transaction-manager';
import {transactions} from 'near-api-js';
import {near} from '@spinfi/number';

const GAS = near('50000000000000', true).unwrap();

const DEPOSIT = near('1250000000000000000000', true).unwrap();

const METHOD_NAME = 'storage_deposit';

export const createDepositStorageTransaction = async (
  tokenAddress: string,
  transactionManager: TransactionManager,
) => {
  return await transactionManager.createTransaction({
    receiverId: tokenAddress,
    actions: [transactions.functionCall(METHOD_NAME, {}, GAS, DEPOSIT)],
  });
};
