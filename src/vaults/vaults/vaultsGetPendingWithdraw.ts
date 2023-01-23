import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type VaultsGetPendingWithdrawResponse = string;

export interface VaultsGetPendingWithdrawRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Vault ID
   */
  vaultId: string;
}

const METHOD_NAME = 'vault_view_pending_withdraw';

export const vaultsGetPendingWithdraw = createView<
  VaultsGetPendingWithdrawRequest,
  VaultsGetPendingWithdrawResponse
>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('vaultsGetPendingWithdraw'));
      invariant(config.contractId, contractIdErrorMessage('vaultsGetPendingWithdraw'));

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
