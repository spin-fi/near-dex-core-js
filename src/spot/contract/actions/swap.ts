import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {isNear} from '@spinfi/shared';

import {ContractConfig} from '../../types';
import {createSwapNearFactory} from './swapNear';
import {createSwapFtFactory} from './swapFt';
import {createCheckDepositStorageFactory} from '../../native/actions/checkDepositStorage';

/**
 * @category swap
 */
export type SwapResponse = FinalExecutionOutcome[];

/**
 * @category swap
 */
export interface SwapRequest {
  /**
   * Market identifier to exchange
   */
  marketId: number;
  /**
   * Token Address From
   */
  tokenAddressFrom: string;
  /**
   * Token Address To
   */
  tokenAddressTo: string;
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
 * @category swap
 */
export interface SwapConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
  /**
   * Attached Deposit in decimal
   */
  attachedDeposit?: BigInt;
}

export const createSwap = (config: ContractConfig) => {
  const {transactionManager} = config;
  const checkDepositStorageFactory = createCheckDepositStorageFactory(config);
  const swapNearFactory = createSwapNearFactory(config);
  const swapFtFactory = createSwapFtFactory(config);

  return async (request: SwapRequest, config?: SwapConfig): Promise<SwapResponse> => {
    const transactionList = await checkDepositStorageFactory({
      tokenAddress: request.tokenAddressTo,
    });

    if (isNear(request.tokenAddressFrom)) {
      const swapNearTransaction = await swapNearFactory(
        {
          marketId: request.marketId,
          amount: request.amount,
          price: request.price,
        },
        config,
      );

      transactionList.push(swapNearTransaction);
    } else {
      const swapFtTransaction = await swapFtFactory(
        {
          marketId: request.marketId,
          tokenAddress: request.tokenAddressFrom,
          amount: request.amount,
          price: request.price,
        },
        config,
      );

      transactionList.push(swapFtTransaction);
    }

    return await transactionManager.bundleCreateSignAndSendTransactions(transactionList);
  };
};
