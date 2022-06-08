import {FinalExecutionOutcome} from 'near-api-js/lib/providers';
import {near} from '@spinfi/number';

import {ContractConfig} from '../../types';

/**
 * @category placeAsk
 */
export type PlaceAskResponse = FinalExecutionOutcome;

/**
 * @category placeAsk
 */
export interface PlaceAskRequest {
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Order price. Decimal number with a fixed number of decimal places.
   * The number of decimal places is equal to the precision of Quote currency.
   * If market_order is True, the price is required anyway and is used as a slippage
   */
  price: BigInt;
  /**
   * Quantity. Decimal number with a fixed number of decimal places.
   * The number of decimal places is equal to the precision of Base currency
   */
  quantity: BigInt;
  /**
   * A sign that the order is market
   */
  marketOrder: boolean;
  /**
   * Non-unique client order ID
   */
  clientOrderId?: number;
}

/**
 * @category placeAsk
 */
export interface PlaceAskConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = near('300000000000000', true).unwrap();

const METHOD_NAME = 'place_ask';

export const createPlaceAsk = ({account, contractId}: ContractConfig) => {
  return async (request: PlaceAskRequest, config?: PlaceAskConfig): Promise<PlaceAskResponse> => {
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
