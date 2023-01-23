import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {providerErrorMessage} from './messages';
import {createView} from '../utils/createView';

/**
 * @category getTransactionStatus
 */
export type GetTransactionStatusResponse = FinalExecutionOutcome;

/**
 * @category getTransactionStatus
 */
export interface GetTransactionStatusRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Transaction Hash
   */
  txHash: string;
}

export const getTransactionStatus = createView<
  GetTransactionStatusRequest,
  GetTransactionStatusResponse
>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.provider, providerErrorMessage('getTransactionStatus'));

      return await config.provider.txStatus(request.txHash, request.accountId);
    };
  });

  return {
    createMethod,
  };
});
