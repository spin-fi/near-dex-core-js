import {invariant} from '@spinfi/shared';

import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

/**
 * @category getBalance
 */
export type GetBalancesResponse = string;

/**
 * @category getBalance
 */
export interface GetBalancesRequest {
  /**
   * Account ID
   */
  accountId: string;
}

const METHOD_NAME = 'get_balance';

export const getBalances = createView<GetBalancesRequest, GetBalancesResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('getBalances'));
      invariant(config.contractId, contractIdErrorMessage('getBalances'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        account_id: request.accountId,
      });
    };
  });

  return {
    createMethod,
  };
});
