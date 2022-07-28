import {invariant} from '@spinfi/shared';

import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

/**
 * @category getMarketPrices
 */
interface MarketPrices {
  index_price: string;
  mark_price: string;
}

/**
 * @category getMarketPrices
 */
export type GetMarketPricesResponse = Record<string, MarketPrices>;

const METHOD_NAME = 'get_market_prices';

export const getMarketPrices = createView<void, GetMarketPricesResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async () => {
      invariant(config.near, nearErrorMessage('getMarketPrices'));
      invariant(config.contractId, contractIdErrorMessage('getMarketPrices'));

      return await config.near.view(config.contractId, METHOD_NAME);
    };
  });

  return {
    createMethod,
  };
});
