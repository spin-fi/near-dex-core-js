import {invariant} from '@spinfi/shared';

import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

/**
 * @category getCurrencies
 */
export interface Currency {
  /**
   * Currency ID
   */
  id: number;
  /**
   * Currency ft contract address. "near.near" for near token
   */
  address: string;
  /**
   * Currency decimals
   */
  decimals: number;
  /**
   * Currency symbol
   */
  symbol: string;
  /**
   * Currency type. FT for ft contract or Native for near token
   */
  c_type: 'FT' | 'Native';
  /**
   * Maximum amount of currency for deposit
   */
  max_deposit: string;
}

/**
 * @category getCurrencies
 */
export type GetCurrenciesResponse = Currency[];

/**
 * @category getCurrencies
 */
export interface GetCurrenciesRequest {
  /**
   * Number of currencies to return. Default 100
   */
  limit?: number;
  /**
   * Offset in the list of currencies. Default 0
   */
  offset?: number;
}

const METHOD_NAME = 'get_currencies';

export const getCurrencies = createView<GetCurrenciesRequest, GetCurrenciesResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('getCurrencies'));
        invariant(config.contractId, contractIdErrorMessage('getCurrencies'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          limit: request.limit,
          offset: request.offset,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
