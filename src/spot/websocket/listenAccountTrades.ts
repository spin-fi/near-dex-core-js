import {invariant} from '@spinfi/shared';

import {Trade} from './listenTrades';
import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

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

export const listenAccountTrades = createSocket(({notify}) => {
  const createMethod = notify<ListenAccountTradesRequest, AccountTradesNotify>((config) => {
    return (request, notificationConfig) => {
      invariant(config.websocket, websocketErrorMessage('listenAccountTrades'));

      return config.websocket.sendNotify(
        [[`${CHANNEL_NAME}|${request.accountId}`]],
        notificationConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
