import {NativeConfig} from '../../types';

/**
 * @category getBalanceStorage
 */
export interface BalanceStorage {
  // Total in decimal
  total: string;
  // Available in decimal
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
   * Token Address
   */
  tokenAddress: string;
}

const METHOD_NAME = 'storage_balance_of';

export const createGetBalanceStorage = ({account}: NativeConfig) => {
  return async (request: GetBalanceStorageRequest): Promise<GetBalanceStorageResponse> => {
    return await account.viewFunction(request.tokenAddress, METHOD_NAME, {
      account_id: account.accountId,
    });
  };
};
