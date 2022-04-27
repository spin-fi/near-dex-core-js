import {nanoid} from 'nanoid';
import {MethodConfig} from '@spinfi/websocket';

import {WebsocketConfig} from '../../types';

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
export const enum GetCandlesRequestInterval {
  '1s' = 1,
  '3s' = 3,
  '5s' = 5,
  '10s' = 10,
  '15s' = 15,
  '30s' = 30,
  '60s' = 60,
  '160s' = 160,
  '180s' = 180,
  '240s' = 240,
  '480s' = 480,
  '720s' = 720,
  '1440s' = 1440,
}

/**
 * @category getCandles
 */
export interface GetCandlesRequest {
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Interval in minutes
   */
  interval: GetCandlesRequestInterval;
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

export const createGetCandles = ({websocket}: WebsocketConfig) => {
  return (request: GetCandlesRequest, config?: MethodConfig<GetCandlesResponse>) => {
    return websocket.sendMethod(
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
      config,
    );
  };
};
