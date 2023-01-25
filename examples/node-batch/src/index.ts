import {createSpotApi} from '@spinfi/node';

const main = async () => {
  const api = await createSpotApi({
    accountId: '<--- YOUR ACCOUNT ID --->',
    privateKey: '<--- YOUR PRIVATE KEY --->',
    contractId: 'v1.spot.spin-fi.testnet',
    network: 'testnet',
  });

  await api.spin
    .bundle()
    .placeAsk({
      marketId: 1,
      marketOrder: false,
      tokenAddress: '<--- TOKEN ADDRESS --->',
      price: BigInt(1_000_000),
      quantity: BigInt(1_000_000),
    })
    .placeBid({
      marketId: 2,
      marketOrder: true,
      tokenAddress: '<--- TOKEN ADDRESS --->',
      price: BigInt(1_000_000),
      quantity: BigInt(1_000_000),
    })
    .call();
};

main();
