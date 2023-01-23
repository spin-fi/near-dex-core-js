import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {transferFt} from '../../native/transferFt';
import {contractIdErrorMessage} from './messages';
import {createUnit} from '../../utils/createUnit';
import {deadline} from '../../utils/deadline';

/**
 * @category swapFt
 */
export type SwapFtResponse = FinalExecutionOutcome | void;

/**
 * @category swapFt
 */
export interface SwapFtRequest {
  /**
   * Market identifier to exchange
   */
  marketId: number;
  /**
   * Token Address
   */
  tokenAddress: string;
  /**
   * Market order stop price
   */
  price: BigInt;
  /**
   * Amount in decimal
   */
  amount: BigInt;
  /**
   * Deadline
   */
  deadline?: string;
}

/**
 * @category swapFt
 */
export interface SwapFtConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
  /**
   * Attached Deposit in decimal
   */
  deposit?: BigInt;
}

export const swapFt = createUnit<SwapFtRequest, SwapFtConfig>(({paramsify, methodify}) => {
  const createGetParams = paramsify((config) => {
    const getTransferFtParams = transferFt.createGetParams(config);

    return async (request, unitConfig) => {
      invariant(config.contractId, contractIdErrorMessage('swapFt'));

      return await getTransferFtParams(
        {
          ...request,
          receiverId: config.contractId,
          message: JSON.stringify({
            market_id: request.marketId,
            price: request.price.toString(),
            deadline: request.deadline ?? deadline(30).unwrap(),
          }),
        },
        unitConfig,
      );
    };
  });

  const createMethod = methodify((config) => {
    const transferFtMethod = transferFt.createMethod(config);

    return async (request, unitConfig): Promise<SwapFtResponse> => {
      invariant(config.contractId, contractIdErrorMessage('swapFt'));

      return await transferFtMethod(
        {
          ...request,
          receiverId: config.contractId,
          message: JSON.stringify({
            market_id: request.marketId,
            price: request.price.toString(),
            deadline: request.deadline ?? deadline(30).unwrap(),
          }),
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
