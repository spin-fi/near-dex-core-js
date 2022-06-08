import {NativeConfig} from '../../types';

/**
 * @category getBalanceStorageBounds
 */
export interface GetBalanceStorageBoundsRequest {
  /**
   * TODO
   */
  tokenAddress: string;
}

/**
 * @category getBalanceStorageBounds
 */
export type GetBalanceStorageBoundsResponse = {
  /**
   * Minimal amount in yoctoNEAR
   */
  min: string;
  /**
   * Maximum amount in yoctoNEAR
   */
  max: string;
} | null;

const METHOD_NAME = 'storage_balance_bounds';

export const createGetBalanceStorageBounds = ({account}: NativeConfig) => {
  return (request: GetBalanceStorageBoundsRequest): Promise<GetBalanceStorageBoundsResponse> => {
    return account.viewFunction(request.tokenAddress, METHOD_NAME);
  };
};
