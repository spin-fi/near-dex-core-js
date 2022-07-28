import {invariant} from '@spinfi/shared';

import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category listenTrades
 */
export interface Trade {
  block_number: number;
  fee_token_id: number;
  maker_fee: string;
  maker_id: string;
  market_id: number;
  order_maker_id: string;
  order_taker_id: string;
  price: string;
  quantity: string;
  side: 'ask' | 'bid';
  taker_fee: string;
  taker_id: string;
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
  const createMethod = notify<ListenTradesRequest, TradesNotify>((config) => {
    return (request, notificationConfig) => {
      invariant(config.websocket, websocketErrorMessage('listenTrades'));

      return config.websocket.sendNotify(
        [[`${CHANNEL_NAME}|${request.marketId}`]],
        notificationConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
