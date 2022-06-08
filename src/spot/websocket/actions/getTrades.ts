import {nanoid} from 'nanoid';
import {MethodConfig} from '@spinfi/websocket';

import {WebsocketConfig} from '../../types';
import {Trade} from './listenTrades';

/**
 * @category getTrades
 */
export interface TradeWithId extends Trade {
  /**
   * Unique ID of the trade among specified market
   */
  id: number;
}

/**
 * @category getTrades
 */
export type GetTradesResponse = TradeWithId[];

/**
 * @category getTrades
 */
export interface GetTradesRequest {
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Limit
   */
  limit: number;
  /**
   * Offset
   */
  offset: number;
}

const METHOD_NAME = 'get_trades';

export const createGetTrades = ({websocket}: WebsocketConfig) => {
  return (request: GetTradesRequest, config?: MethodConfig<GetTradesResponse>) => {
    return websocket.sendMethod(
      {
        method: METHOD_NAME,
        id: nanoid(),
        params: [request.marketId, request.limit, request.offset],
      },
      config,
    );
  };
};
