import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type MftGetVaultTotalSupplyResponse = string | undefined;

export interface MftGetVaultTotalSupplyRequest {
  /**
   * Vault ID
   */
  vaultId: string;
}

const METHOD_NAME = 'mft_total_supply';

export const mftGetVaultTotalSupply = createView<
  MftGetVaultTotalSupplyRequest,
  MftGetVaultTotalSupplyResponse
>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('mftGetTotalSupply'));
      invariant(config.contractId, contractIdErrorMessage('mftGetTotalSupply'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        token_id: `vault-${request.vaultId}`,
      });
    };
  });

  return {
    createMethod,
  };
});
