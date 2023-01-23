import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type AuctionGetCountResponse = number;

const METHOD_NAME = 'auction_get_count';

export const auctionGetCount = createView<void, AuctionGetCountResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async () => {
      invariant(config.near, nearErrorMessage('auctionGetCount'));
      invariant(config.contractId, contractIdErrorMessage('auctionGetCount'));

      return await config.near.view(config.contractId, METHOD_NAME);
    };
  });

  return {
    createMethod,
  };
});
