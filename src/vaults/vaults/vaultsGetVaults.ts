import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {VaultsVault} from './vaultsGetVault';

export type VaultsGetVaultsResponse = VaultsVault[];

export interface VaultsGetVaultsRequest {
  /**
   * Limit of vaults to fetch
   */
  limit: string;
  /**
   * Offset from which to fetch
   */
  offset: string;
}

const METHOD_NAME = 'vault_get_all';

export const vaultsGetVaults = createView<VaultsGetVaultsRequest, VaultsGetVaultsResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('vaultsGetVaults'));
        invariant(config.contractId, contractIdErrorMessage('vaultsGetVaults'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          limit: request.limit,
          offset: request.offset,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
