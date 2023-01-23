import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type VaultsGetPendingDepositResponse = string;

export interface VaultsGetPendingDepositRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Vault ID
   */
  vaultId: string;
}

const METHOD_NAME = 'vault_view_pending_deposit';

export const vaultsGetPendingDeposit = createView<
  VaultsGetPendingDepositRequest,
  VaultsGetPendingDepositResponse
>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('vaultsGetPendingDeposit'));
      invariant(config.contractId, contractIdErrorMessage('vaultsGetPendingDeposit'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        account_id: request.accountId,
        vault_id: request.vaultId,
      });
    };
  });

  return {
    createMethod,
  };
});
