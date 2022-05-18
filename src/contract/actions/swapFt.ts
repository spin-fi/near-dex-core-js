import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {near} from '@spinfi/number';

import {ContractConfig} from '../../types';

/**
 * @category swapFt
 */
export type SwapFtResponse = FinalExecutionOutcome;

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
  attachedDeposit?: BigInt;
}

const GAS = near('300000000000000', true).unwrap();

const ATTACHED_DEPOSIT = near('1', true).unwrap();

const METHOD_NAME = 'ft_transfer_call';

export const createSwapFt = ({account, contractId}: ContractConfig) => {
  return async (request: SwapFtRequest, config?: SwapFtConfig): Promise<SwapFtResponse> => {
    return await account.functionCall({
      contractId: request.tokenAddress,
      methodName: METHOD_NAME,
      args: {
        receiver_id: contractId,
        amount: request.amount.toString(),
        msg: JSON.stringify({
          market_id: request.marketId,
          price: request.price.toString(),
        }),
      },
      gas: config?.gas?.toString() ?? GAS,
      attachedDeposit: config?.attachedDeposit?.toString() ?? ATTACHED_DEPOSIT,
    });
  };
};
