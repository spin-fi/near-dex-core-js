import {invariant} from '@spinfi/shared';
import {nanoid} from 'nanoid';

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

export const getOrdersHistory = createSocket(({methodify}) => {
  const createMethod = methodify<GetOrdersHistoryRequest, GetOrdersHistoryResponse>((config) => {
    return (request, methodConfig) => {
      invariant(config.websocket, websocketErrorMessage('getOrdersHistory'));

      return config.websocket.sendMethod(
        {
          method: METHOD_NAME,
          id: nanoid(),
          params: [request.marketId, request.accountId, request.limit, request.offset],
        },
        methodConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
