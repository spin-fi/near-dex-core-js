import {invariant} from '@spinfi/shared';

import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

/**
 * @category getMaxDeposit
 */
export type GetMaxDepositResponse = string;

const METHOD_NAME = 'get_max_deposit';

export const getMaxDeposit = createView<void, GetMaxDepositResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async () => {
      invariant(config.near, nearErrorMessage('getMaxDeposit'));
      invariant(config.contractId, contractIdErrorMessage('getMaxDeposit'));

      return await config.near.view(config.contractId, METHOD_NAME, '');
    };
  });

  return {
    createMethod,
  };
});
