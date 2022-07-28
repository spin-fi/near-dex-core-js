import {invariant} from '@spinfi/shared';
import {nanoid} from 'nanoid';

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

export const getTrades = createSocket(({methodify}) => {
  const createMethod = methodify<GetTradesRequest, GetTradesResponse>((config) => {
    return (request, methodConfig) => {
      invariant(config.websocket, websocketErrorMessage('getTrades'));

      return config.websocket.sendMethod(
        {
          method: METHOD_NAME,
          id: nanoid(),
          params: [request.marketId, request.limit, request.offset],
        },
        methodConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
