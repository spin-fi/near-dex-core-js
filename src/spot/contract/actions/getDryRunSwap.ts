import {ContractConfig} from '../../types';

/**
 * @category getDryRunSwap
 */
export interface GetDryRunSwapResponse {
  /**
   * TODO
   */
  refund: string;
  /**
   * TODO
   */
  received: string;
}

/**
 * @category getDryRunSwap
 */
export interface GetDryRunSwapRequest {
  /**
   * Market identifier to exchange
   */
  marketId: number;
  /**
   * Market order price
   */
  price: BigInt;
  /**
   * The name of the token to be exchanged
   */
  token: string;
  /**
   * Quantity to exchange
   */
  amount: BigInt;
}

const METHOD_NAME = 'dry_run_swap';

export const createGetDryRunSwap = ({account, contractId}: ContractConfig) => {
  return async (request: GetDryRunSwapRequest): Promise<GetDryRunSwapResponse> => {
    return await account.viewFunction(contractId, METHOD_NAME, {
      swap: {
        market_id: request.marketId,
        price: request.price.toString(),
      },
      token: request.token,
      amount: request.amount.toString(),
    });
  };
};
