import {NotifyWithStateConfig} from '@spinfi/websocket';

import {WebsocketConfig} from '../../types';
import {OrderInfo} from './listenOrders';

/**
 * @category listenAccountOrders
 */
export type AccountOrdersState = OrderInfo[];

/**
 * @category listenAccountOrders
 */
export type AccountOrdersNotify = OrderInfo;

/**
 * @category listenAccountOrders
 */
export interface ListenAccountOrdersRequest {
  /**
   * Account ID
   */
  accountId: string;
}

const CHANNEL_NAME = 'account|orders';

export const createListenAccountOrders = ({websocket}: WebsocketConfig) => {
  return (
    request: ListenAccountOrdersRequest,
    config?: NotifyWithStateConfig<AccountOrdersState, AccountOrdersNotify>,
  ) => {
    return websocket.sendNotifyWithState([[`${CHANNEL_NAME}|${request.accountId}`]], config);
  };
};
