import {invariant} from '@spinfi/shared';

import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

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

export const getDryRunSwap = createView<GetDryRunSwapRequest, GetDryRunSwapResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('getDryRunSwap'));
        invariant(config.contractId, contractIdErrorMessage('getDryRunSwap'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          swap: {
            market_id: request.marketId,
            price: request.price.toString(),
          },
          token: request.token,
          amount: request.amount.toString(),
        });
      };
    });

    return {
      createMethod,
    };
  },
);
