import {invariant} from '@spinfi/shared';

import {OrderInfo} from './listenOrders';
import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category listenAccountOrders
 */
export type AccountOrdersState = OrderInfo[];

/**
 * @category listenAccountOrders
 */
export type AccountOrdersNotify = Omit<OrderInfo, 'created_at' | 'updated_at'> & {
  /**
   * Order creation and update timestamp in nanoseconds (1 second = 1 * 10^9 nanosecond)
   */
  ts?: string;
};

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

export const listenAccountOrders = createSocket(({statify}) => {
  const createMethod = statify<ListenAccountOrdersRequest, AccountOrdersState, AccountOrdersNotify>(
    (outerConfig) => {
      return (request, innerConfig) => {
        invariant(outerConfig.websocket, websocketErrorMessage('listenAccountOrders'));

        return outerConfig.websocket.statify(
          {
            params: [[`${CHANNEL_NAME}|${request.accountId}`]],
          },
          innerConfig,
        );
      };
    },
  );

  return {
    createMethod,
  };
});
