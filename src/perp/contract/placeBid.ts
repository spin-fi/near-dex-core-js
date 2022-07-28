import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {PlaceAskRequest} from './placeAsk';
import {selectorErrorMessage} from './messages';
import {createUnit} from '../../utils/createUnit';
import {deadline} from '../../utils/deadline';

/**
 * @category placeBid
 */
export type PlaceBidResponse = FinalExecutionOutcome | void;

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

const GAS = '300000000000000';

const DEADLINE = deadline(30).unwrap();

const METHOD_NAME = 'place_bid';

export const placeBid = createUnit<PlaceBidRequest, PlaceBidConfig>(({paramsify, methodify}) => {
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
                deadline: request.deadline ?? DEADLINE,
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

    return async (request, unitConfig): Promise<PlaceBidResponse> => {
      invariant(config.selector, selectorErrorMessage('placeBid'));

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
