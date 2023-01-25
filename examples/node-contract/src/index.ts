import {createSpotApi} from '@spinfi/node';

const main = async () => {
  const api = await createSpotApi({
    accountId: '<--- YOUR ACCOUNT ID --->',
    privateKey: '<--- YOUR PRIVATE KEY --->',
    contractId: 'v1.spot.spin-fi.testnet',
    network: 'testnet',
  });

  const orderbook = await api.spin.getOrderbook({
    marketId: 1,
  });

  console.log(orderbook);
};

main();
