import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {AuctionAuction} from './auctionGetAuction';

export type AuctionGetAuctionsResponse = AuctionAuction[];

export interface AuctionGetAuctionsRequest {
  /**
   * Limit of vaults to fetch
   */
  limit?: string;
  /**
   * Offset from which to fetch
   */
  offset?: string;
  /**
   * Reversed order
   */
  reversed?: boolean;
}

const METHOD_NAME = 'auction_get_all';

export const auctionGetAuctions = createView<AuctionGetAuctionsRequest, AuctionGetAuctionsResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('auctionGetAuctions'));
        invariant(config.contractId, contractIdErrorMessage('auctionGetAuctions'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          limit: request.limit,
          offset: request.offset,
          reversed: request.reversed,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
