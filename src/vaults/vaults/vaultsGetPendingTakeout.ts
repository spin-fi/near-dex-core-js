import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type VaultsGetPendingTakeoutResponse = string;

export interface VaultsGetPendingTakeoutRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Vault ID
   */
  vaultId: string;
}

const METHOD_NAME = 'vault_view_takeout';

export const vaultsGetPendingTakeout = createView<
  VaultsGetPendingTakeoutRequest,
  VaultsGetPendingTakeoutResponse
>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('vaultsGetPendingTakeout'));
      invariant(config.contractId, contractIdErrorMessage('vaultsGetPendingTakeout'));

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
