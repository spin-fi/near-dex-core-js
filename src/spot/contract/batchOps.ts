import {invariant} from '@spinfi/shared';
import {FinalExecutionOutcome} from 'near-api-js/lib/providers';

import {PlaceAskRequest} from './placeAsk';
import {selectorErrorMessage} from './messages';
import {createUnit} from '../../utils/createUnit';

/**
 * @category batchOps
 */
export type BatchOpsResponse = FinalExecutionOutcome | void;

/**
 * @category batchOps
 */
export interface BatchOpsPlace extends PlaceAskRequest {
  orderType: 'Ask' | 'Bid';
}

/**
 * @category batchOps
 */
export interface BatchOpsItem {
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Contains a list of orders to be drop
   */
  drop?: string[];
  /**
   * Contains a list of orders to place
   */
  place?: BatchOpsPlace[];
}

/**
 * @category batchOps
 */
export interface BatchOpsRequest {
  /**
   * Enumeration of markets and operations on them
   */
  ops: BatchOpsItem[];
}

/**
 * @category batchOps
 */
export interface BatchOpsConfig {
  /**
   * Gas in decimal
   */
  gas?: BigInt;
}

const GAS = '300000000000000';

const METHOD_NAME = 'batch_ops';

export const batchOps = createUnit<BatchOpsRequest, BatchOpsConfig>(({paramsify, methodify}) => {
  const createGetParams = paramsify(() => {
    return async (request, unitConfig) => {
      return {
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName: METHOD_NAME,
              args: {
                ops: request.ops.map((item) => {
                  return {
                    market_id: item.marketId,
                    drop: item.drop,
                    place: item.place?.map((placeItem) => {
                      return {
                        market_id: placeItem.marketId,
                        price: placeItem.price,
                        quantity: placeItem.quantity,
                        market_order: placeItem.marketOrder,
                        order_type: placeItem.orderType,
                        client_order_id: placeItem.clientOrderId,
                      };
                    }),
                  };
                }),
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

    return async (request, unitConfig): Promise<BatchOpsResponse> => {
      invariant(config.selector, selectorErrorMessage('batchOps'));

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
