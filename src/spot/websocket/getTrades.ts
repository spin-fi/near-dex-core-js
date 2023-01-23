import {invariant} from '@spinfi/shared';

import {Trade} from './listenTrades';
import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

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

export const getTrades = createSocket(({callify}) => {
  const createMethod = callify<GetTradesRequest, GetTradesResponse>((outerConfig) => {
    return (request, innerConfig) => {
      invariant(outerConfig.websocket, websocketErrorMessage('getTrades'));

      return outerConfig.websocket.call(
        {
          method: METHOD_NAME,
          params: [request.marketId, request.limit, request.offset],
        },
        innerConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
