import {JsonRpcProvider} from 'near-api-js/lib/providers';
import {Websocket} from '@spinfi/websocket';

import {CoreSelector} from './selector';

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
}

/**
 * @category spin
 */
export interface Config {
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
  near?: Near;
}

/**
 * @category spin
 */
export interface Near {
  view: (contractId: string, methodName: string, args?: unknown) => Promise<any>;
  balance: (accountId: string) => Promise<string>;
}
