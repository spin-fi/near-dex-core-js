import {JsonRpcProvider} from 'near-api-js/lib/providers';
import {Websocket} from '@spinfi/websocket';

import {CoreSelector} from './selector';
import {CoreNear} from './near';

/**
 * @category spin
 */
export interface CoreConfig {
  /**
   * Contarct ID
   */
  contractId?: string;
  /**
   * @spinfi/websocket instance
   */
  websocket?: Websocket;
  /**
   * TODO
   */
  provider?: JsonRpcProvider;
  /**
   * TODO
   */
  selector?: CoreSelector;
  /**
   * TODO
   */
  near?: CoreNear;
}
