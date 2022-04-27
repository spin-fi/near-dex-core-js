import {Response, ResponseConfig} from '@spinfi/shared';
import {NotifyConfig} from '@spinfi/websocket';
import {Subscription} from 'rxjs';

import {WebsocketConfig} from '../../types';
import {LSide} from '../types';

/**
 * @category listenTrades
 */
export interface Trade {
  /**
   * Block number in which the transaction was added
   */
  block_number: number;
  /**
   * Comission amount from the maker side. If negative then rebate
   */
  maker_fee: string;
  /**
   * Token ID in which the maker paid the fee
   */
  maker_fee_token_id: number;
  /**
   * Near account ID of the maker
   */
  maker_id: string;
  /**
   * Market ID
   */
  market_id: number;
  /**
   * Matched order ID from the maker side
   */
  order_maker_id: string;
  /**
   * Matched order ID from the taker side
   */
  order_taker_id: string;
  /**
   * Matching price in the quote currency
   */
  price: string;
  /**
   * Matching quantity in the base currency
   */
  quantity: string;
  /**
   * bid or ask
   */
  side: LSide;
  /**
   * Comission amount from the taker side
   */
  taker_fee: string;
  /**
   * Token ID in which the taker paid the fee
   */
  taker_fee_token_id: string;
  /**
   * Near account id of the taker
   */
  taker_id: string;
  /**
   * Timestamp in nanoseconds (1 second = 1 * 10^9 nanosecond)
   */
  ts: string;
}

/**
 * @category listenTrades
 */
export type TradesNotify = Trade;

/**
 * @category listenTrades
 */
export interface ListenTradesRequest {
  /**
   * Market ID
   */
  marketId: number;
}

/**
 * @category listenTrades
 */
export type ListenTrades = <T extends boolean>(
  request: ListenTradesRequest,
  config?: NotifyConfig<void, TradesNotify>,
  responseConfig?: ResponseConfig<T>,
) => Response<Subscription>;

const CHANNEL_NAME = 'trades';

export const createListenTrades = ({websocket}: WebsocketConfig) => {
  return (request: ListenTradesRequest, config?: NotifyConfig<void, TradesNotify>) => {
    return websocket.sendNotify([[`${CHANNEL_NAME}|${request.marketId}`]], config);
  };
};
