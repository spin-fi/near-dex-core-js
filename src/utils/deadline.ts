import {nums} from '@spinfi/number';

export const deadline = (value: number) => {
  const now = nums(Date.now().toString()).mul(nums('1000000'));
  const offset = nums(value.toString()).mul(nums('1000000000'));
  return now.plus(offset);
};
