import {NEAR_TOKEN_ADDRESS} from '../consts';

export const isNear = (tokenAddress: string) => {
  return tokenAddress === NEAR_TOKEN_ADDRESS;
};
