import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {AuctionOrder} from './auctionGetOrder';

export type AuctionGetOrdersResponse = AuctionOrder[];

export type AuctionGetOrdersRequest = {
  /**
   * Auction Id
   */
  auctionId: number;
  /**
   * Account Id
   */
  accountId: string;
};

const METHOD_NAME = 'auction_get_orders';

export const auctionGetOrders = createView<AuctionGetOrdersRequest, AuctionGetOrdersResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('auctionGetOrders'));
        invariant(config.contractId, contractIdErrorMessage('auctionGetOrders'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          account_id: request.accountId,
          auction_id: request.auctionId,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
