import {createSpotApi} from '@spinfi/node';

const main = async () => {
  const api = await createSpotApi({
    accountId: '<--- YOUR ACCOUNT ID --->',
    privateKey: '<--- YOUR PRIVATE KEY --->',
    websocket: 'wss://testnet.api.spin.fi/perp/v1/ws',
  });

  api.spin.listenBookL3(
    {
      marketId: 1,
    },
    {
      onStateOk: (state) => {
        console.log(state);
      },
      onNotifyOk: (notify) => {
        console.log(notify);
      },
    },
  );
};

main();
