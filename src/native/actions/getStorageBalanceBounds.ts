import {ContractConfig} from '../../types';

export type GetStorageBalanceBoundsResponse = {
  /**
   * Minimal amount in yoctoNEAR
   */
  min: string;
  /**
   * Maximum amount in yoctoNEAR
   */
  max: string;
} | null;

export const createStorageBalanceBounds = async (
  account: ContractConfig['account'],
  tokenAddress: string,
): Promise<GetStorageBalanceBoundsResponse> => {
  return await account.viewFunction(tokenAddress, 'storage_balance_bounds');
};
