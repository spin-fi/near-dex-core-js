import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {selectorErrorMessage} from './messages';
import {createUnit} from '../../utils/createUnit';

/**
 * @category cancelOrders
 */
export type CancelOrdersResponse = FinalExecutionOutcome | void;

/**
 * @category cancelOrders
 */
export interface CancelOrdersRequest {
  /**
   * Optional market ID. Orders from all markets would be dropped if not specified
   */
  marketId?: number;
  /**
   * Optional limit for number of orders to be dropped
   */
  limit?: number;
}

/**
 * @category cancelOrders
 */
export interface CancelOrdersConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = '300000000000000';

const METHOD_NAME = 'cancel_orders';

export const cancelOrders = createUnit<CancelOrdersRequest, CancelOrdersConfig>(
  ({paramsify, methodify}) => {
    const createGetParams = paramsify(() => {
      return async (request, unitConfig) => {
        return {
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: METHOD_NAME,
                args: {
                  market_id: request?.marketId,
                  limit: request?.limit,
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

      return async (request, unitConfig): Promise<CancelOrdersResponse> => {
        invariant(config.selector, selectorErrorMessage('cancelOrders'));

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
  },
);
