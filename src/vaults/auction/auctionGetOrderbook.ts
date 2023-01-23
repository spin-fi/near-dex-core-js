import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type AuctionOrderbookNode = {
  price: string;
  quantity: string;
};

export type AuctionGetOrderbookResponse = {
  ask_orders: AuctionOrderbookNode[];
  bid_orders: AuctionOrderbookNode[];
};

export interface AuctionGetOrderbookRequest {
  /**
   * Auction Id
   */
  auctionId: number;
  /**
   * Limit of vaults to fetch
   */
  limit?: string;
}

const METHOD_NAME = 'auction_get_orderbook';

export const auctionGetOrderbook = createView<
  AuctionGetOrderbookRequest,
  AuctionGetOrderbookResponse
>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('auctionGetOrderbook'));
      invariant(config.contractId, contractIdErrorMessage('auctionGetOrderbook'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        auction_id: request.auctionId,
        limit: request.limit,
      });
    };
  });

  return {
    createMethod,
  };
});
