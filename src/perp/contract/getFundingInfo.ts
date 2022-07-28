import {invariant} from '@spinfi/shared';

import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

/**
 * @category getFundingInfo
 */
interface FundingInfoPrice {
  index_price?: string;
  mid_price?: null;
}

/**
 * @category getFundingInfo
 */
interface FundingInfoRate {
  avg_mid_price?: string;
  funding_rate?: string;
}

/**
 * @category getFundingInfo
 */
export interface GetFundingInfoResponse {
  current_index_price?: string;
  current_rate?: FundingInfoRate;
  epoch_index?: number;
  prices?: Record<string, FundingInfoPrice>;
  rates?: Record<string, FundingInfoRate>;
}

/**
 * @category getFundingInfo
 */
export interface GetFundingInfoRequest {
  /**
   * Market ID
   */
  marketId: number;
}

const METHOD_NAME = 'get_funding_info';

export const getFundingInfo = createView<GetFundingInfoRequest, GetFundingInfoResponse>(
  ({methodify}) => {
    const createMethod = methodify((config) => {
      return async (request) => {
        invariant(config.near, nearErrorMessage('getFundingInfo'));
        invariant(config.contractId, contractIdErrorMessage('getFundingInfo'));

        return await config.near.view(config.contractId, METHOD_NAME, {
          market_id: request.marketId,
        });
      };
    });

    return {
      createMethod,
    };
  },
);
