import {invariant, Nil} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type AuctionCurrencyInfo = {
  address: string;
  decimals: number;
  symbol: string;
  id?: Nil<number>;
  max_deposit?: Nil<string>;
  deposit_amount?: Nil<string>;
  accumulated_fee?: Nil<string>;
};

export type AuctionGetCurrenciesResponse = AuctionCurrencyInfo[];

export type AuctionGetCurrenciesRequest = {
  /**
   * Limit
   */
  limit?: string;
  /**
   * Offset
   */
  offset?: string;
};

const METHOD_NAME = 'auction_get_currencies';

export const auctionGetCurrencies = createView<
  AuctionGetCurrenciesRequest,
  AuctionGetCurrenciesResponse
>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('auctionGetCurrencies'));
      invariant(config.contractId, contractIdErrorMessage('auctionGetCurrencies'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        limit: request.limit,
        offset: request.offset,
      });
    };
  });

  return {
    createMethod,
  };
});
