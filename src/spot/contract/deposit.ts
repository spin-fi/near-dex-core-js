import {invariant} from '@spinfi/shared';
import type {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {isNear} from '@spinfi/shared';

import {depositNear} from './depositNear';
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
}

export const deposit = createUnit<DepositRequest, DepositConfig>(({paramsify, methodify}) => {
  const createGetParams = paramsify((config) => {
    const getTransferFtParams = transferFt.createGetParams(config);
    const getDepositNearParams = depositNear.createGetParams(config);

    return async (request, unitConfig) => {
      if (isNear(request.tokenAddress)) {
        return await getDepositNearParams(request, unitConfig);
      } else {
        invariant(config.contractId, contractIdErrorMessage('deposit'));

        return await getTransferFtParams(
          {
            ...request,
            receiverId: config.contractId,
          },
          unitConfig,
        );
      }
    };
  });

  const createMethod = methodify((config) => {
    const transferFtMethod = transferFt.createMethod(config);
    const depositNearMethod = depositNear.createMethod(config);

    return async (request, unitConfig): Promise<DepositResponse> => {
      if (isNear(request.tokenAddress)) {
        return await depositNearMethod(request, unitConfig);
      } else {
        invariant(config.contractId, contractIdErrorMessage('deposit'));

        return await transferFtMethod(
          {
            ...request,
            receiverId: config.contractId,
          },
          unitConfig,
        );
      }
    };
  });

  return {
    createGetParams,
    createMethod,
  };
});
