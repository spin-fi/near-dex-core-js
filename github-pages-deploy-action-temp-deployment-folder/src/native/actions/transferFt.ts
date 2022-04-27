import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {near} from '@spinfi/number';

import {NativeConfig} from '../../types';

/**
 * @category transferFt
 */
export type TransferFtResponse = FinalExecutionOutcome;

/**
 * @category transferFt
 */
export interface TransferFtRequest {
  /**
   * Receiver ID
   */
  receiverId: string;
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
 * @category transferFt
 */
export interface TransferFtConfig {
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

export const createTransferFt = ({account}: NativeConfig) => {
  return async (
    request: TransferFtRequest,
    config?: TransferFtConfig,
  ): Promise<TransferFtResponse> => {
    return await account.functionCall({
      contractId: request.tokenAddress,
      methodName: METHOD_NAME,
      args: {
        receiver_id: request.receiverId,
        amount: request.amount.toString(),
        msg: MSG,
      },
      gas: config?.gas?.toString() ?? GAS,
      attachedDeposit: config?.attachedDeposit?.toString() ?? ATTACHED_DEPOSIT,
    });
  };
};
