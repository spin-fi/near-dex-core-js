import {invariant} from '@spinfi/shared';

import {nearErrorMessage} from './messages';
import {createView} from '../utils/createView';

/**
 * @category getBalanceStorage
 */
export interface BalanceStorage {
  /**
   * Total in decimal
   */
  total: string;
  /**
   * Available in decimal
   */
  available: string;
}

/**
 * @category getBalanceStorage
 */
export type GetBalanceStorageResponse = BalanceStorage | null;

/**
 * @category getBalanceStorage
 */
export interface GetBalanceStorageRequest {
  /**
   * Account ID
   */
  accountId: string;
  /**
   * Token Address
   */
  tokenAddress: string;
}

const METHOD_NAME = 'storage_balance_of';

export const getBalanceStorage = createView<GetBalanceStorageRequest, GetBalanceStorageResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('getBalanceStorage'));

        return await config.near.view(request.tokenAddress, METHOD_NAME, {
          account_id: request.accountId,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
