import {invariant} from '@spinfi/shared';

import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category listenAccountBalances
 */
export interface AccountBalance {
  /**
   * Available balance to trade
   */
  available: string;
  /**
   * Locked balance in open orders
   */
  reserved: string;
  /**
   * Token ID
   */
  token_id: number;
}

/**
 * @category listenAccountBalances
 */
export type AccountBalancesState = AccountBalance[];

/**
 * @category listenAccountBalances
 */
export interface AccountBalancesNotify {
  /**
   * Account ID
   */
  account_id: string;
  /**
   * TODO
   */
  action: 'withdraw' | 'deposit' | 'reserve' | 'release' | 'buy' | 'sell';
  id: number;
  /**
   * Initial quantity of the order in base currency
   */
  quantity: string;
  /**
   * Token ID
   */
  token_id: number;
}

/**
 * @category listenAccountBalances
 */
export interface ListenAccountBalancesRequest {
  /**
   * Account ID
   */
  accountId: string;
}

const CHANNEL_NAME = 'account|balances';

export const listenAccountBalances = createSocket(({statify}) => {
  const createMethod = statify<
    ListenAccountBalancesRequest,
    AccountBalancesState,
    AccountBalancesNotify
  >((outerConfig) => {
    return (request, innerConfig) => {
      invariant(outerConfig.websocket, websocketErrorMessage('listenAccountBalances'));

      return outerConfig.websocket.statify(
        {
          params: [[`${CHANNEL_NAME}|${request.accountId}`]],
        },
        innerConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
