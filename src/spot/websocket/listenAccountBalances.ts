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

export const listenAccountBalances = createSocket(({snapshotify}) => {
  const createMethod = snapshotify<
    ListenAccountBalancesRequest,
    AccountBalancesNotify,
    AccountBalancesState
  >((config) => {
    return (request, snapshotConfig) => {
      invariant(config.websocket, websocketErrorMessage('listenAccountBalances'));

      return config.websocket.sendNotifyWithState(
        [[`${CHANNEL_NAME}|${request.accountId}`]],
        snapshotConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
