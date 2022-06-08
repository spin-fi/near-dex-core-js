import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {NativeConfig} from '../../types';

/**
 * @category getTransactionStatus
 */
export type GetTransactionStatusResponse = FinalExecutionOutcome;

/**
 * @category getTransactionStatus
 */
export interface GetTransactionStatusRequest {
  /**
   * Transaction Hash
   */
  txHash: string;
}

export const createGetTransactionStatus = ({account, provider}: NativeConfig) => {
  return async (request: GetTransactionStatusRequest): Promise<GetTransactionStatusResponse> => {
    return await provider.txStatus(request.txHash, account.accountId);
  };
};
