import {invariant, Nil} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type StorageGetStorageResponse = Nil<{
  available_amount?: number;
}>;

export interface StorageGetStorageRequest {
  /**
   * Account ID
   */
  accountId: string;
}

const METHOD_NAME = 'get_storage';

export const storageGetStorage = createView<StorageGetStorageRequest, StorageGetStorageResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('storageGetStorage'));
        invariant(config.contractId, contractIdErrorMessage('storageGetStorage'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          account_id: request.accountId,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
