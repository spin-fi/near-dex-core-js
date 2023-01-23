import {invariant} from '@spinfi/shared';

import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

/**
 * @category getDeposits
 */
export type GetDepositsResponse = Record<string, string>;

/**
 * @category getDeposits
 */
export interface GetDepositsRequest {
  /**
   * Account ID
   */
  accountId: string;
}

const METHOD_NAME = 'get_deposits';

export const getDeposits = createView<GetDepositsRequest, GetDepositsResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('getDeposits'));
      invariant(config.contractId, contractIdErrorMessage('getDeposits'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        account_id: request.accountId,
      });
    };
  });

  return {
    createMethod,
  };
});
