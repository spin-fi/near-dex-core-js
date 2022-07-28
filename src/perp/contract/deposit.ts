import {invariant} from '@spinfi/shared';
import type {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {transferFt} from '../../native/transferFt';
import {contractIdErrorMessage} from './messages';
import {createUnit} from '../../utils/createUnit';

/**
 * @category deposit
 */
export type DepositResponse = FinalExecutionOutcome | void;

/**
 * @category deposit
 */
export interface DepositRequest {
  /**
   * Token Address
   */
  tokenAddress: string;
  /**
   * Amount in decimal
   */
  amount: BigInt;
}

/**
 * @category deposit
 */
export interface DepositConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
  /**
   * Attached Deposit in decimal
   */
  deposit?: BigInt;
}

export const deposit = createUnit<DepositRequest, DepositConfig>(({paramsify, methodify}) => {
  const createGetParams = paramsify((config) => {
    const getTransferFtParams = transferFt.createGetParams(config);

    return async (request, unitConfig) => {
      invariant(config.contractId, contractIdErrorMessage('deposit'));

      return await getTransferFtParams(
        {
          ...request,
          receiverId: config.contractId,
        },
        unitConfig,
      );
    };
  });

  const createMethod = methodify((config) => {
    const transferFtMethod = transferFt.createMethod(config);

    return async (request, unitConfig): Promise<DepositResponse> => {
      invariant(config.contractId, contractIdErrorMessage('deposit'));

      return await transferFtMethod(
        {
          ...request,
          receiverId: config.contractId,
        },
        unitConfig,
      );
    };
  });

  return {
    createGetParams,
    createMethod,
  };
});
