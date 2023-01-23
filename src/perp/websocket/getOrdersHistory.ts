import {invariant} from '@spinfi/shared';

import {OrderInfo} from './listenAccountOrders';
import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category getOrdersHistory
 */
export type GetOrdersHistoryResponse = OrderInfo[];

/**
 * @category getOrdersHistory
 */
export interface GetOrdersHistoryRequest {
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Limit
   */
  limit: number;
  /**
   * Offset
   */
  offset: number;
}

const METHOD_NAME = 'get_orders_history';

export const getOrdersHistory = createSocket(({callify}) => {
  const createMethod = callify<GetOrdersHistoryRequest, GetOrdersHistoryResponse>((outerConfig) => {
    return (request, innerConfig) => {
      invariant(outerConfig.websocket, websocketErrorMessage('getOrdersHistory'));

      return outerConfig.websocket.call(
        {
          method: METHOD_NAME,
          params: [request.marketId, request.accountId, request.limit, request.offset],
        },
        innerConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
