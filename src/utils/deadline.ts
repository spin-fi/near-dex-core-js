import {nums} from '@spinfi/number';

export const deadline = (value: number, from = Date.now()) => {
  const now = nums(from.toString()).mul(nums('1000000'));
  const offset = nums(value.toString()).mul(nums('1000000000'));
  return now.plus(offset);
};
