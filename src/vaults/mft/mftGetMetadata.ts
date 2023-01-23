import {invariant, Nil} from '@spinfi/shared';

import {createView} from '../../utils/createView';
import {nearErrorMessage, contractIdErrorMessage} from './messages';

export type MftAsset = {
  decimals?: Nil<number>;
  icon?: Nil<string>;
  name?: Nil<string>;
  reference?: Nil<string>;
  reference_hash?: Nil<string>;
  spec?: Nil<string>;
  symbol?: Nil<string>;
};

export type MftGetMetadataResponse = MftAsset | undefined;

export interface MftGetMetadataRequest {
  /**
   * Token ID
   */
  tokenId: string;
}

const METHOD_NAME = 'mft_metadata';

export const mftGetMetadata = createView<MftGetMetadataRequest, MftGetMetadataResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('mftGetMetadata'));
        invariant(config.contractId, contractIdErrorMessage('mftGetMetadata'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          token_id: request.tokenId,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
