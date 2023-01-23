import {invariant} from '@spinfi/shared';

import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

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
  side: 'ask' | 'bid';
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

const CHANNEL_NAME = 'trades';

export const listenTrades = createSocket(({notify}) => {
  const createMethod = notify<ListenTradesRequest, TradesNotify>((outerConfig) => {
    return (request, innerConfig) => {
      invariant(outerConfig.websocket, websocketErrorMessage('listenTrades'));

      return outerConfig.websocket.notify(
        {
          params: [[`${CHANNEL_NAME}|${request.marketId}`]],
        },
        innerConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
