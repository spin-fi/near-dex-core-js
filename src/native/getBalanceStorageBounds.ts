import {invariant} from '@spinfi/shared';

import {nearErrorMessage} from './messages';
import {createView} from '../utils/createView';

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

export const getBalanceStorageBounds = createView<
  GetBalanceStorageBoundsRequest,
  GetBalanceStorageBoundsResponse
>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('getBalanceStorageBounds'));

      return await config.near.view(request.tokenAddress, METHOD_NAME);
    };
  });

  return {
    createMethod,
  };
});
