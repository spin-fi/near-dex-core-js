import {invariant, responsifyAsync} from '@spinfi/shared';

import {Config, NativeConfig} from '../types';
import {ACCOUNT_MESSAGE} from './consts';

export const createAsyncNativeWrapper = ({account}: Config) => {
  return <T extends any[], R>(create: (config: NativeConfig) => (...args: T) => Promise<R>) => {
    return responsifyAsync((...args: T) => {
      invariant(account, ACCOUNT_MESSAGE);
      const action = create({account});
      return action(...args);
    });
  };
};
