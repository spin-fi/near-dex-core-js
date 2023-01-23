import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {MftAsset} from './mftGetMetadata';

export type MftGetVaultMetadataResponse = MftAsset | undefined;

export interface MftGetVaultMetadataRequest {
  /**
   * Vault ID
   */
  vaultId: string;
}

const METHOD_NAME = 'mft_metadata';

export const mftGetVaultMetadata = createView<
  MftGetVaultMetadataRequest,
  MftGetVaultMetadataResponse
>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('MftGetVaultMetadata'));
      invariant(config.contractId, contractIdErrorMessage('MftGetVaultMetadata'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        token_id: `vault-${request.vaultId}`,
      });
    };
  });

  return {
    createMethod,
  };
});
