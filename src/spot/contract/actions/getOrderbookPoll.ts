import {responseAsync} from '@spinfi/shared';

import {ContractConfig} from '../../types';
import {createGetOrderbook, GetOrderbookRequest, GetOrderbookResponse} from './getOrderbook';

/**
 * @category getOrderbookPoll
 */
export interface GetOrderbookPollResponse {
  stop: () => void;
}

/**
 * @category getOrderbookPoll
 */
export type GetOrderbookPollRequest = GetOrderbookRequest;

/**
 * @category getOrderbookPoll
 */
export interface GetOrderbookPollConfig {
  interval?: number;
  onOk?: (data: GetOrderbookResponse) => void;
  onError?: (error: Error) => void;
}

const INTERVAL = 1000;

export const createGetOrderbookPoll = (config: ContractConfig) => {
  const getOrderbook = createGetOrderbook(config);

  return (
    request: GetOrderbookPollRequest,
    config?: GetOrderbookPollConfig,
  ): GetOrderbookPollResponse => {
    const intervalId = setInterval(async () => {
      const response = await responseAsync(() => getOrderbook(request));
      if (response.type === 'ERROR') config?.onError?.(response.error);
      if (response.type === 'OK') config?.onOk?.(response.data);
    }, config?.interval ?? INTERVAL);

    return {
      stop: () => clearInterval(intervalId),
    };
  };
};
