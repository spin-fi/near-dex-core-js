import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {near} from '@spinfi/number';

import {ContractConfig} from '../../types';

/**
 * @category depositFt
 */
export type DepositFtResponse = FinalExecutionOutcome;

/**
 * @category depositFt
 */
export interface DepositFtRequest {
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
 * @category depositFt
 */
export interface DepositFtConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
  /**
   * Attached Deposit in decimal
   */
  attachedDeposit?: BigInt;
}

const GAS = near('300000000000000', true).unwrap();

const ATTACHED_DEPOSIT = near('1', true).unwrap();

const MSG = '';

const METHOD_NAME = 'ft_transfer_call';

export const createDepositFt = ({account, contractId}: ContractConfig) => {
  return async (
    request: DepositFtRequest,
    config?: DepositFtConfig,
  ): Promise<DepositFtResponse> => {
    return await account.functionCall({
      contractId: request.tokenAddress,
      methodName: METHOD_NAME,
      args: {
        receiver_id: contractId,
        amount: request.amount.toString(),
        msg: MSG,
      },
      gas: config?.gas?.toString() ?? GAS,
      attachedDeposit: config?.attachedDeposit?.toString() ?? ATTACHED_DEPOSIT,
    });
  };
};
