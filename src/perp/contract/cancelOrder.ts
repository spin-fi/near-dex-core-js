import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {selectorErrorMessage} from './messages';
import {createUnit} from '../../utils/createUnit';
import {deadline} from '../../utils/deadline';

/**
 * @category cancelOrder
 */
export type CancelOrderResponse = FinalExecutionOutcome | void;

/**
 * @category cancelOrder
 */
export interface CancelOrderRequest {
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Order ID
   */
  orderId: string;
  /**
   * Deadline
   */
  deadline?: BigInt;
}

/**
 * @category cancelOrder
 */
export interface CancelOrderConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = '300000000000000';

const DEADLINE = deadline(30).unwrap();

const METHOD_NAME = 'cancel_order';

export const cancelOrder = createUnit<CancelOrderRequest, CancelOrderConfig>(
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
                  market_id: request.marketId,
                  order_id: request.orderId,
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

      return async (request, unitConfig): Promise<CancelOrderResponse> => {
        invariant(config.selector, selectorErrorMessage('cancelOrder'));

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
