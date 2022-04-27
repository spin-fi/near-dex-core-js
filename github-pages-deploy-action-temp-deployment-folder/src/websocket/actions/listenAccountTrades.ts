import {NotifyConfig} from '@spinfi/websocket';

import {WebsocketConfig} from '../../types';
import {Trade} from './listenTrades';

/**
 * @category listenAccountTrades
 */
export type AccountTradesNotify = Trade;

/**
 * @category listenAccountTrades
 */
export interface ListenAccountTradesRequest {
  /**
   * Account ID
   */
  accountId: string;
}

const CHANNEL_NAME = 'account|trades';

export const createListenAccountTrades = ({websocket}: WebsocketConfig) => {
  return (
    request: ListenAccountTradesRequest,
    config?: NotifyConfig<void, AccountTradesNotify>,
  ) => {
    return websocket.sendNotify([[`${CHANNEL_NAME}|${request.accountId}`]], config);
  };
};
