import {nanoid} from 'nanoid';
import {MethodConfig} from '@spinfi/websocket';

import {WebsocketConfig} from '../../types';
import {TradeWithId} from './getTrades';

/**
 * @category getUserTrades
 */
export type GetUserTradesResponse = TradeWithId[];

/**
 * @category getUserTrades
 */
export interface GetUserTradesRequest {
  /**
   * User ID
   */
  accountId: number;
  /**
   * Limit
   */
  limit: number;
  /**
   * Offset
   */
  offset: number;
}

const METHOD_NAME = 'get_user_trades';

export const createGetUserTrades = ({websocket}: WebsocketConfig) => {
  return (request: GetUserTradesRequest, config?: MethodConfig<GetUserTradesResponse>) => {
    return websocket.sendMethod(
      {
        method: METHOD_NAME,
        id: nanoid(),
        params: [request.accountId, request.limit, request.offset],
      },
      config,
    );
  };
};
