import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {isNear} from '@spinfi/shared';

import {ContractConfig} from '../../types';
import {createDepositNear} from './depositNear';
import {createDepositFt} from './depositFt';

/**
 * @category deposit
 */
export type DepositResponse = FinalExecutionOutcome;

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
  attachedDeposit?: BigInt;
}

export const createDeposit = (config: ContractConfig) => {
  const depositNear = createDepositNear(config);
  const depositFt = createDepositFt(config);

  return async (request: DepositRequest, config?: DepositConfig): Promise<DepositResponse> => {
    if (isNear(request.tokenAddress)) {
      return await depositNear(request, config);
    } else {
      return await depositFt(request, config);
    }
  };
};
