import {transactions} from 'near-api-js';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {Transaction} from 'near-api-js/lib/transaction';
import {near} from '@spinfi/number';
import {head} from '@spinfi/shared';

import {ContractConfig} from '../../types';

/**
 * @category swapNear
 */
export type SwapNearResponse = FinalExecutionOutcome;

/**
 * @category swapNear
 */
export interface SwapNearRequest {
  /**
   * Market identifier to exchange
   */
  marketId: number;
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
 * @category swapNear
 */
export interface SwapNearConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = near('280000000000000', true).unwrap();

const DEPOSIT = BigInt(1);

const METHOD_NAME = 'swap_near';

export const createSwapNearFactory = ({transactionManager, contractId}: ContractConfig) => {
  return async (request: SwapNearRequest, config?: SwapNearConfig): Promise<Transaction> => {
    return await transactionManager.createTransaction({
      receiverId: contractId,
      actions: [
        transactions.functionCall(
          METHOD_NAME,
          {
            swap: {
              market_id: request.marketId,
              price: request.price.toString(),
            },
          },
          config?.gas?.toString() ?? GAS,
          (BigInt(request.amount.toString()) + DEPOSIT).toString(),
        ),
      ],
    });
  };
};

export const createSwapNear = (config: ContractConfig) => {
  const {transactionManager} = config;
  const swapNearFactory = createSwapNearFactory(config);

  return async (request: SwapNearRequest, config?: SwapNearConfig): Promise<SwapNearResponse> => {
    const transaction = await swapNearFactory(request, config);
    const response = await transactionManager.bundleCreateSignAndSendTransactions([transaction]);
    return head(response)!;
  };
};
