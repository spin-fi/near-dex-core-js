import {invariant} from '@spinfi/shared';
import {nanoid} from 'nanoid';

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

export const getUserTrades = createSocket(({methodify}) => {
  const createMethod = methodify<GetUserTradesRequest, GetUserTradesResponse>((config) => {
    return (request, methodConfig) => {
      invariant(config.websocket, websocketErrorMessage('getUserTrades'));

      return config.websocket.sendMethod(
        {
          method: METHOD_NAME,
          id: nanoid(),
          params: [request.accountId, request.limit, request.offset],
        },
        methodConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
