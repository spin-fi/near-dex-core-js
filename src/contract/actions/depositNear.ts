import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {near} from '@spinfi/number';

import {ContractConfig} from '../../types';

/**
 * @category depositNear
 */
export type DepositNearResponse = FinalExecutionOutcome;

/**
 * @category depositNear
 */
export interface DepositNearRequest {
  /**
   * Amount in decimal
   */
  amount: BigInt;
}

/**
 * @category depositNear
 */
export interface DepositNearConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = near('300000000000000', true).unwrap();

const METHOD_NAME = 'deposit_near';

export const createDepositNear = ({account, contractId}: ContractConfig) => {
  return async (
    request: DepositNearRequest,
    config?: DepositNearConfig,
  ): Promise<DepositNearResponse> => {
    return await account.functionCall({
      contractId,
      methodName: METHOD_NAME,
      args: {},
      gas: config?.gas?.toString() ?? GAS,
      attachedDeposit: request.amount.toString(),
    });
  };
};
