import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {selectorErrorMessage} from './messages';
import {createUnit} from '../../utils/createUnit';

/**
 * @category placeAsk
 */
export type PlaceAskResponse = FinalExecutionOutcome | void;

/**
 * @category placeAsk
 */
export interface PlaceAskRequest {
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Token address of a currency to deposit if the transaction requires more than user has on the account
   */
  tokenAddress: string;
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
   * The amount to deposit before placing the order
   */
  depositAmount?: BigInt;
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

const GAS = '300000000000000';

const METHOD_NAME = 'place_ask';

export const placeAsk = createUnit<PlaceAskRequest, PlaceAskConfig>(({paramsify, methodify}) => {
  const createGetParams = paramsify(() => {
    return async (request, unitConfig) => {
      return {
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName: METHOD_NAME,
              args: {
                market_id: request.marketId,
                price: request.price.toString(),
                quantity: request.quantity.toString(),
                market_order: request.marketOrder,
                client_order_id: request.clientOrderId,
              },
              gas: unitConfig?.gas?.toString() ?? GAS,
              deposit: '',
            },
          },
        ],
      };
    };
  });

  const createMethod = methodify((config) => {
    const getParams = createGetParams(config);

    return async (request, unitConfig): Promise<PlaceAskResponse> => {
      invariant(config.selector, selectorErrorMessage('placeAsk'));

      const wallet = await config.selector.wallet();
      const params = await getParams(request, unitConfig);

      if (!params) {
        return;
      }

      return await wallet.signAndSendTransaction(params);
    };
  });

  return {
    createGetParams,
    createMethod,
  };
});
