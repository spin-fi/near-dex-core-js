import {invariant} from '@spinfi/shared';

import {Market} from './getMarket';
import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

/**
 * @category getMarkets
 */
export type GetMarketsResponse = Market[];

const METHOD_NAME = 'get_markets';

export const getMarkets = createView<void, GetMarketsResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async () => {
      invariant(config.near, nearErrorMessage('getMarkets'));
      invariant(config.contractId, contractIdErrorMessage('getMarkets'));

      return await config.near.view(config.contractId, METHOD_NAME);
    };
  });

  return {
    createMethod,
  };
});
