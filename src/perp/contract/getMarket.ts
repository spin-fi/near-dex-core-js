import {invariant} from '@spinfi/shared';

import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

/**
 * @category getMarket
 */
export interface MarketFees {
  /**
   * Fixed decimals for fee values
   */
  decimals: number;
  /**
   * True means the rebate exists for makers
   */
  is_rebate: boolean;
  /**
   * Maker fee percent. E.g. maker_fee = 5000 and decimals = 6 means 0.005 (or 0.5%)
   */
  maker_fee: string;
  /**
   * Taker fee percent. E.g. taker_fee = 10000 and decimals == 6 means 0.01 (or 1%)
   */
  taker_fee: string;
}

/**
 * @category getMarket
 */
export interface MarketLimits {
  /**
   * Minimum base asset quantity for the order
   */
  min_base_quantity: string;
  /**
   * Maximum base asset quantity for the order
   */
  max_base_quantity: string;
  /**
   * Minimum quote asset quantity for the order
   */
  min_quote_quantity: string;
  /**
   * Maximum quote asset quantity for the order
   */
  max_quote_quantity: string;
  /**
   * Limits on the maximum number of asks per user
   */
  max_ask_count: number;
  /**
   * Limits on the maximum number of bids per user
   */
  max_bid_count: number;
  /**
   * TODO
   */
  tick_size?: string;
  /**
   * TODO
   */
  step_size?: string;
}

/**
 * @category getMarket
 */
export interface MarketAvailability {
  /**
   * Enable or disable order placing
   */
  allow_place: boolean;
  /**
   * Enable or disable order cancelling
   */
  allow_cancel: boolean;
}

/**
 * @category getMarket
 */
export interface Market {
  /**
   * Market ID
   */
  id: number;
  leverage: string;
  symbol: string;
  fees: MarketFees;
  availability: MarketAvailability;
  limits: MarketLimits;
}

/**
 * @category getMarket
 */
export type GetMarketResponse = Market;

/**
 * @category getMarket
 */
export interface GetMarketRequest {
  /**
   * Market ID
   */
  marketId: number;
}

const METHOD_NAME = 'get_market';

export const getMarket = createView<GetMarketRequest, GetMarketResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('getMarket'));
      invariant(config.contractId, contractIdErrorMessage('getMarket'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        market_id: request.marketId,
      });
    };
  });

  return {
    createMethod,
  };
});
