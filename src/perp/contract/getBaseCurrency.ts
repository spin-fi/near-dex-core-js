import {invariant} from '@spinfi/shared';

import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

/**
 * @category getBaseCurrency
 */
export interface GetBaseCurrencyResponse {
  address: string;
  decimals: number;
  symbol: string;
  max_deposit: string;
}

const METHOD_NAME = 'get_base_currency';

export const getBaseCurrency = createView<void, GetBaseCurrencyResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async () => {
      invariant(config.near, nearErrorMessage('getBaseCurrency'));
      invariant(config.contractId, contractIdErrorMessage('getBaseCurrency'));

      return await config.near.view(config.contractId, METHOD_NAME);
    };
  });

  return {
    createMethod,
  };
});
