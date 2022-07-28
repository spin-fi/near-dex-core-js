import type {JsonRpcProvider} from 'near-api-js/lib/providers/json-rpc-provider';
import type {CodeResult, AccountView} from 'near-api-js/lib/providers/provider';

import {Near} from '../types';

const parse = (response: Uint8Array) => {
  return JSON.parse(Buffer.from(response).toString());
};

const stringify = (args?: unknown) => {
  return Buffer.from(JSON.stringify(args));
};

export const createNear = (provider?: JsonRpcProvider): Near | undefined => {
  if (!provider) {
    return;
  }

  const view = async (contractId: string, methodName: string, args: unknown = {}) => {
    const serializedArgs = stringify(args).toString('base64');

    const result = await provider.query<CodeResult>({
      request_type: 'call_function',
      account_id: contractId,
      method_name: methodName,
      args_base64: serializedArgs,
      finality: 'optimistic',
    });

    return result.result && result.result.length > 0 && parse(Buffer.from(result.result));
  };

  const balance = async (accountId: string) => {
    const protocolConfig = await provider.experimental_protocolConfig({finality: 'final'});

    const state = await provider.query<AccountView>({
      request_type: 'view_account',
      account_id: accountId,
      finality: 'optimistic',
    });

    console.log({state, protocolConfig});

    return '0';
  };

  return {
    view,
    balance,
  };
};

// async getAccountBalance() {
//   const protocolConfig = await this.connection.provider.experimental_protocolConfig({ finality: 'final' });
//   const state = await this.state();
//   const costPerByte = new bn_js_1.default(protocolConfig.runtime_config.storage_amount_per_byte);
//   const stateStaked = new bn_js_1.default(state.storage_usage).mul(costPerByte);
//   const staked = new bn_js_1.default(state.locked);
//   const totalBalance = new bn_js_1.default(state.amount).add(staked);
//   const availableBalance = totalBalance.sub(bn_js_1.default.max(staked, stateStaked));
//   return {
//       total: totalBalance.toString(),
//       stateStaked: stateStaked.toString(),
//       staked: staked.toString(),
//       available: availableBalance.toString()
//   };
// }
