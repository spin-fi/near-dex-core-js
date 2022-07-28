import {invariant} from '@spinfi/shared';

import {nearErrorMessage, contractIdErrorMessage} from './messages';
import {createView} from '../../utils/createView';

/**
 * @category getPositions
 */
export interface Position {
  /**
   * Position size
   */
  size: string;
  /**
   * Position size in human readable form
   */
  size_in_units: string;
  /**
   * Average entry price for the position
   */
  entry_price: string;
  /**
   * TODO
   */
  entry_price_in_units: string;
  /**
   * Long or Short direction
   */
  position_type: 'Long' | 'Short';
  /**
   * Creation timestamp in nanoseconds
   */
  created_at: string;
  /**
   * Update timestamp in nanoseconds
   */
  updated_at: string;
  /**
   * Unrealized profit-and-loss in base currency
   */
  upnl: string;
  /**
   * Unrealized profit-and-loss in base currency in human readable form
   */
  upnl_in_units: string;
  /**
   * TODO
   */
  market_id: number;
}

/**
 * @category getPositions
 */
export interface GetPositionsResponse {
  /**
   * Margin ratio coef
   */
  margin_ratio: string;
  /**
   * Positions
   */
  positions: Position[];
}

/**
 * @category getPositions
 */
export interface GetPositionsRequest {
  /**
   * Account ID
   */
  accountId: string;
}

const METHOD_NAME = 'get_positions';

export const getPositions = createView<GetPositionsRequest, GetPositionsResponse>(({methodify}) => {
  const createMethod = methodify((config) => {
    return async (request) => {
      invariant(config.near, nearErrorMessage('getPositions'));
      invariant(config.contractId, contractIdErrorMessage('getPositions'));

      return await config.near.view(config.contractId, METHOD_NAME, {
        account_id: request.accountId,
      });
    };
  });

  return {
    createMethod,
  };
});
