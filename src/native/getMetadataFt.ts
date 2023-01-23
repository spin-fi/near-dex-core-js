import {invariant, Nil} from '@spinfi/shared';

import {nearErrorMessage} from './messages';
import {createView} from '../utils/createView';

/**
 * @category getMetadataFt
 */
export type Asset = {
  decimals?: Nil<number>;
  icon?: Nil<string>;
  name?: Nil<string>;
  reference?: Nil<string>;
  reference_hash?: Nil<string>;
  spec?: Nil<string>;
  symbol?: Nil<string>;
};

/**
 * @category getMetadataFt
 */
export type GetMetadataFtResponse = Asset | undefined;

/**
 * @category getMetadataFt
 */
export interface GetMetadataFtRequest {
  /**
   * Token Address
   */
  tokenAddress: string;
}

const METHOD_NAME = 'ft_metadata';

export const getMetadataFt = createView<GetMetadataFtRequest, GetMetadataFtResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('getMetadataFt'));

        return await config.near.view(request.tokenAddress, METHOD_NAME);
      };
    });

    return {
      createMethod,
    };
  },
);
