import {transactions} from 'near-api-js';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {Transaction} from 'near-api-js/lib/transaction';
import {near} from '@spinfi/number';
import {head} from '@spinfi/shared';

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

const GAS = near('280000000000000', true).unwrap();

const ATTACHED_DEPOSIT = near('1', true).unwrap();

const METHOD_NAME = 'ft_transfer_call';

export const createSwapFtFactory = ({transactionManager, contractId}: ContractConfig) => {
  return async (request: SwapFtRequest, config?: SwapFtConfig): Promise<Transaction> => {
    return await transactionManager.createTransaction({
      receiverId: request.tokenAddress,
      actions: [
        transactions.functionCall(
          METHOD_NAME,
          {
            receiver_id: contractId,
            amount: request.amount.toString(),
            msg: JSON.stringify({
              market_id: request.marketId,
              price: request.price.toString(),
            }),
          },
          config?.gas?.toString() ?? GAS,
          config?.attachedDeposit?.toString() ?? ATTACHED_DEPOSIT,
        ),
      ],
    });
  };
};

export const createSwapFt = (config: ContractConfig) => {
  const {transactionManager} = config;
  const swapFtFactory = createSwapFtFactory(config);

  return async (request: SwapFtRequest, config?: SwapFtConfig): Promise<SwapFtResponse> => {
    const transaction = await swapFtFactory(request, config);
    const response = await transactionManager.bundleCreateSignAndSendTransactions([transaction]);
    return head(response)!;
  };
};
