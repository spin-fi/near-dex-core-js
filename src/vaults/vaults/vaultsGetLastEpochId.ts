import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type VaultsGetLastEpochIdResponse = string | undefined;

export interface VaultsGetLastEpochIdRequest {
  /**
   * Vault ID
   */
  vaultId: string;
}

const METHOD_NAME = 'vault_last_epoch_id';

export const vaultsGetLastEpochId = createView<
  VaultsGetLastEpochIdRequest,
  VaultsGetLastEpochIdResponse
>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('vaultsGetLastEpochId'));
      invariant(config.contractId, contractIdErrorMessage('vaultsGetLastEpochId'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        vault_id: request.vaultId,
      });
    };
  });

  return {
    createMethod,
  };
});
