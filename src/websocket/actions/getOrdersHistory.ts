import {nanoid} from 'nanoid';
import {MethodConfig} from '@spinfi/websocket';

import {WebsocketConfig} from '../../types';
import {OrderInfo} from './listenOrders';

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

export const createGetOrdersHistory = ({websocket}: WebsocketConfig) => {
  return (request: GetOrdersHistoryRequest, config?: MethodConfig<GetOrdersHistoryResponse>) => {
    return websocket.sendMethod(
      {
        method: METHOD_NAME,
        id: nanoid(),
        params: [request.marketId, request.accountId, request.limit, request.offset],
      },
      config,
    );
  };
};
