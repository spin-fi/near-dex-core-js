import {NotifyConfig} from '@spinfi/websocket';

import {WebsocketConfig} from '../../types';

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
export const enum AccountBalancesNotifyAction {
  'withdraw' = 'withdraw',
  'deposit' = 'deposit',
  'reserve' = 'reserve',
  'release' = 'release',
  'buy' = 'buy',
  'sell' = 'sell',
}

/**
 * @category listenAccountBalances
 */
export interface AccountBalancesNotify {
  /**
   * Account ID
   */
  account_id: string;
  action: AccountBalancesNotifyAction;
  id: number;
  /**
   * Initial quantity of the order in base currency
   */
  quantity: string;
  // Token ID
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

export const createListenAccountBalances = ({websocket}: WebsocketConfig) => {
  return (
    request: ListenAccountBalancesRequest,
    config?: NotifyConfig<AccountBalancesState, AccountBalancesNotify>,
  ) => {
    return websocket.sendNotify([[`${CHANNEL_NAME}|${request.accountId}`]], config);
  };
};
