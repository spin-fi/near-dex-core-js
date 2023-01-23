import {invariant} from '@spinfi/shared';

import {nearErrorMessage} from './messages';
import {createView} from '../utils/createView';

/**
 * @category getBalanceFt
 */
export type GetBalanceFtResponse = string;

/**
 * @category getBalanceFt
 */
export interface GetBalanceFtRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Token Address
   */
  tokenAddress: string;
}

const METHOD_NAME = 'ft_balance_of';

export const getBalanceFt = createView<GetBalanceFtRequest, GetBalanceFtResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('getBalanceFt'));

      return await config.near.view(request.tokenAddress, METHOD_NAME, {
        account_id: request.accountId,
      });
    };
  });

  return {
    createMethod,
  };
});
