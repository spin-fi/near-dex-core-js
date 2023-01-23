import {invariant} from '@spinfi/shared';

import {TradeWithId} from './getTrades';
import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

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

const METHOD_NAME = 'get_user_trades';

export const getUserTrades = createSocket(({callify}) => {
  const createMethod = callify<GetUserTradesRequest, GetUserTradesResponse>((outerConfig) => {
    return (request, innerConfig) => {
      invariant(outerConfig.websocket, websocketErrorMessage('getUserTrades'));

      return outerConfig.websocket.call(
        {
          method: METHOD_NAME,
          params: [request.accountId, request.limit, request.offset],
        },
        innerConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
