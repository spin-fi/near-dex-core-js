import {invariant} from '@spinfi/shared';
import {nanoid} from 'nanoid';

import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category getCandles
 */
export interface Candle {
  /**
   * Highest price for the specified interval
   */
  high: string;
  /**
   * Lowest price for the specified interval
   */
  low: string;
  /**
   * Open price for the specified interval
   */
  open: string;
  /**
   * Close price for the specified interval
   */
  close: string;
  /**
   * Total volume in quote currencies for the specified
   */
  quote_volume: string;
  /**
   * Total volume in base currencies for the specified
   */
  base_volume: string;
  /**
   * Open timestamp of the specified interval in nanoseconds (inclusive)
   */
  open_ts: string;
  /**
   * Close timestamp of the specified interval in nanoseconds (exclusive)
   */
  close_ts: string;
}

/**
 * @category getCandles
 */
export type GetCandlesResponse = Candle[];

/**
 * @category getCandles
 */
export interface GetCandlesRequest {
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Interval
   */
  interval:
    | '1s'
    | '3s'
    | '5s'
    | '10s'
    | '15s'
    | '30s'
    | '60s'
    | '160s'
    | '180s'
    | '240s'
    | '480s'
    | '720s'
    | '1440s';
  /**
   * From (timestamp in nanoseconds)
   */
  from: number;
  /**
   * To (timestamp in nanoseconds)
   */
  to: number;
  /**
   * Limit
   */
  limit: number;
  /**
   * Offset
   */
  offset: number;
}

const METHOD_NAME = 'get_candles';

export const getCandles = createSocket(({methodify}) => {
  const createMethod = methodify<GetCandlesRequest, GetCandlesResponse>((config) => {
    return (request, methodConfig) => {
      invariant(config.websocket, websocketErrorMessage('getCandles'));

      return config.websocket.sendMethod(
        {
          method: METHOD_NAME,
          id: nanoid(),
          params: [
            request.marketId,
            request.interval,
            request.from,
            request.to,
            request.limit,
            request.offset,
          ],
        },
        methodConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
