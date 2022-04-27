import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {near} from '@spinfi/number';

import {ContractConfig} from '../../types';
import {PlaceAskRequest} from './placeAsk';

/**
 * @category placeBid
 */
export type PlaceBidResponse = FinalExecutionOutcome;

/**
 * @category placeBid
 */
export type PlaceBidRequest = PlaceAskRequest;

/**
 * @category placeBid
 */
export interface PlaceBidConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = near('300000000000000', true).unwrap();

const METHOD_NAME = 'place_bid';

export const createPlaceBid = ({account, contractId}: ContractConfig) => {
  return async (request: PlaceBidRequest, config?: PlaceBidConfig): Promise<PlaceBidResponse> => {
    return await account.functionCall({
      contractId,
      methodName: METHOD_NAME,
      args: {
        market_id: request.marketId,
        price: request.price.toString(),
        quantity: request.quantity.toString(),
        market_order: request.marketOrder,
        client_order_id: request.clientOrderId,
      },
      gas: config?.gas?.toString() ?? GAS,
    });
  };
};
