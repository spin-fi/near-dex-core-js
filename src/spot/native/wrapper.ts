import {invariant} from '@spinfi/shared';

import {Config, NativeConfig} from '../types';
import {ACCOUNT_MESSAGE, TRANSACTION_MANAGER_MESSAGE, PROVIDER_MESSAGE} from './consts';

export const createAsyncNativeWrapper = ({account, transactionManager, provider}: Config) => {
  return <T extends any[], R>(create: (config: NativeConfig) => (...args: T) => Promise<R>) => {
    return (...args: T) => {
      invariant(account, ACCOUNT_MESSAGE);
      invariant(transactionManager, TRANSACTION_MANAGER_MESSAGE);
      invariant(provider, PROVIDER_MESSAGE);

      const action = create({
        account,
        transactionManager,
        provider,
      });

      return action(...args);
    };
  };
};
