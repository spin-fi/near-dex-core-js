import {invariant, Rec} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type AuctionGetDepositsResponse = Rec<string>;

export type AuctionGetDepositsRequest = {
  /**
   * Account Id
   */
  accountId: string;
  /**
   * Offset
   */
  offset?: string;
  /**
   * Limit
   */
  limit?: string;
};

const METHOD_NAME = 'auction_get_deposits';

export const auctionGetDeposits = createView<AuctionGetDepositsRequest, AuctionGetDepositsResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('auctionGetDeposits'));
        invariant(config.contractId, contractIdErrorMessage('auctionGetDeposits'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          account_id: request.accountId,
          offset: request.offset,
          limit: request.limit,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
