import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {selectorErrorMessage} from './messages';
import {createUnit} from '../../utils/createUnit';
import {deadline} from '../../utils/deadline';

/**
 * @category placeAsk
 */
export type PlaceAskResponse = FinalExecutionOutcome | void;

/**
 * @category placeAsk
 */
export type PlaceAskTimeInForce = 'GTC' | 'FOK';

/**
 * @category placeAsk
 */
export interface PlaceAskRequest {
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Order price
   */
  price: BigInt;
  /**
   * Quantity
   */
  quantity: BigInt;
  /**
   * Deadline
   */
  deadline?: string;
  /**
   * A sign that the order is market
   */
  marketOrder: boolean;
  /**
   * Non-unique client order ID
   */
  clientOrderId?: number;
  /**
   * TODO
   */
  postOnly?: boolean;
  /**
   * TODO
   */
  timeInForce?: PlaceAskTimeInForce;
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
                post_only: request.postOnly,
                time_in_force: request.timeInForce,
                deadline: request.deadline ?? deadline(30).unwrap(),
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
