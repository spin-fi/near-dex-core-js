import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type MftGetVaultBalanceResponse = string | undefined;

export interface MftGetVaultBalanceRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Vault ID
   */
  vaultId: string;
}

const METHOD_NAME = 'mft_balance_of';

export const mftGetVaultBalance = createView<MftGetVaultBalanceRequest, MftGetVaultBalanceResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('mftGetVaultBalance'));
        invariant(config.contractId, contractIdErrorMessage('mftGetVaultBalance'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          account_id: request.accountId,
          token_id: `vault-${request.vaultId}`,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
