import {invariant} from '@spinfi/shared';

import {BookNode} from './listenBookL1';
import {websocketErrorMessage} from './messages';
import {createSocket} from '../../utils/createSocket';

/**
 * @category listenBookL3
 */
export interface BookNodeChange {
  price: string;
  quantity: string;
  side: 'ask' | 'bid';
}

/**
 * @category listenBookL3
 */
export interface BookL3State {
  price_nodes: {
    asks: BookNode[];
    bids: BookNode[];
  };
  ts: string;
}

/**
 * @category listenBookL3
 */
export interface BookL3Notify {
  market_id: number;
  price_node_changes: BookNodeChange[];
  ts: string;
}

/**
 * @category listenBookL3
 */
export interface ListenBookL3Request {
  /**
   * Market ID
   */
  marketId: number;
}

const CHANNEL_NAME = 'bookL3';

export const listenBookL3 = createSocket(({snapshotify}) => {
  const createMethod = snapshotify<ListenBookL3Request, BookL3Notify, BookL3State>((config) => {
    return (request, snapshotConfig) => {
      invariant(config.websocket, websocketErrorMessage('listenBookL3'));

      return config.websocket.sendNotifyWithState(
        [[`${CHANNEL_NAME}|${request.marketId}`]],
        snapshotConfig,
      );
    };
  });

  return {
    createMethod,
  };
});
