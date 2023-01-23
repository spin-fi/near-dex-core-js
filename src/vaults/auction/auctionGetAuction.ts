import {invariant, Nil} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type AuctionStatus = 'Created' | 'Started' | 'Finished' | 'Closed';

export type AuctionCurrency = {
  address?: Nil<string>;
  decimal?: Nil<number>;
  id?: Nil<number>;
  symbol?: Nil<string>;
};

export type AuctionData = {
  creator?: Nil<string>;
  min_price?: Nil<string>;
  quantity?: Nil<string>;
  start_ts?: Nil<string>;
  stop_ts?: Nil<string>;
};

export type AuctionFees = {
  decimals?: Nil<number>;
  is_rebate?: Nil<boolean>;
  maker_fee?: Nil<string>;
  taker_fee?: Nil<string>;
};

export type AuctionAvailability = {
  allow_cancel?: Nil<boolean>;
  allow_place?: Nil<boolean>;
  allow_trigger?: Nil<boolean>;
};

export type AuctionLimits = {
  max_ask_count?: Nil<number>;
  max_base_quantity?: Nil<string>;
  max_bid_count?: Nil<number>;
  max_match_count?: Nil<number>;
  max_quote_quantity?: Nil<string>;
  min_base_quantity?: Nil<string>;
  min_quote_quantity?: Nil<string>;
  step_size?: Nil<string>;
  tick_size?: Nil<string>;
};

export type AuctionExecutionResult = {
  base_refund?: Nil<string>;
  executed_quantity?: Nil<string>;
  quote_income?: Nil<string>;
  execution_price?: Nil<string>;
};

export type AuctionAuction = {
  /**
   * Auction id
   */
  id: number;
  /**
   * Status
   */
  status: AuctionStatus;
  /**
   * Ticker
   */
  ticker: string;
  /**
   * Base currency
   */
  base: AuctionCurrency;
  /**
   * Quote currency
   */
  quote: AuctionCurrency;
  /**
   * Data
   */
  data: AuctionData;
  /**
   * Fees
   */
  fees: AuctionFees;
  /**
   * Availability for placing and cancelling orders
   */
  availability: AuctionAvailability;
  /**
   * Limits for placing orders
   */
  limits: AuctionLimits;
  /**
   * Execution result
   */
  execution_result?: Nil<AuctionExecutionResult>;
};

export type AuctionGetAuctionResponse = AuctionAuction | undefined;

export interface AuctionGetAuctionRequest {
  /**
   * Auction ID
   */
  auctionId: number;
}

const METHOD_NAME = 'auction_get_by_id';

export const auctionGetAuction = createView<AuctionGetAuctionRequest, AuctionGetAuctionResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('auctionGetAuction'));
        invariant(config.contractId, contractIdErrorMessage('auctionGetAuction'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          auction_id: request.auctionId,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
