import {invariant} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type VaultsGetVaultsAmountResponse = number;

const METHOD_NAME = 'vault_count';

export const vaultsGetVaultsAmount = createView<void, VaultsGetVaultsAmountResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async () => {
        invariant(config.near, nearErrorMessage('vaultsGetVaultsAmount'));
        invariant(config.contractId, contractIdErrorMessage('vaultsGetVaultsAmount'));

        return await config.near.view(config.contractId, METHOD_NAME);
      };
    });

    return {
      createMethod,
    };
  },
);
