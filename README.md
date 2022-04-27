# Links

- [**Contract api**](https://docs.api.spin.fi/#introduction)

- [**JS api**](https://spin-fi.github.io/near-dex-core-js/)

- [**@spinfi/core**](https://github.com/spin-fi/near-dex-core-js)

- [**@spinfi/node**](https://github.com/spin-fi/near-dex-node-js)

# @spinfi/node

Spin node create spin api for node

### How to install

```bash
yarn add @spinfi/node
```

### How to init

```js
import {createApi} from '@spinfi/node';
import {getPrestable} from '@spinfi/shared';

const stage = getPrestable();

const data = {
  accountId: 'some account id value',
  privateKey: 'some private key value',
};

const initApi = async () => {
  const {init} = createApi({
    contractId: stage.contractId,
    privateKey: data.privateKey,
    accountId: data.accountId,
    websocket: stage.websocket,
    near: stage.near,
  });

  const response = await init();

  if (response.type === 'ERROR') {
    console.error(apiResponse.error);
  }

  if (response.type === 'OK') {
    const api = response.data;
    console.log(api);
  }
};

initApi();
```

# @spinfi/core

Spin core create spin api instace that work exactly in browser and node.js

## Contract

Contract property provide functions to call `spin` contract api methods as async/await js functions

```js
const response = await api().spin.contract.depositFt(request);

if (response.type === 'ERROR') {
  console.error(response.error);
}

if (response.type === 'OK') {
  console.log(response.data);
}
```

## Natvive

Native property provide functions to call native near api methods used in `spin` contract methods

```js
const response = await api().spin.native.transferFt(request);

if (response.type === 'ERROR') {
  console.error(response.error);
}

if (response.type === 'OK') {
  console.log(response.data);
}
```

## Websocket

Websocket property provide functions to call `spin` off-chain methods by websocket

Websocket method divided in two types:

- method (similar to async call with callback)
- subscription

### 1. Method

Method require some parameters in `json rpc` format and return some data with `onOk` callback.
If websocket return not expected data format - api will ignore it. If websocket return correct
message without connection/js error, but with error field - data handled by `onError` callback.
If websocket connection/js runtime rise error then method function return response.type as `ERROR` and
no callbacks its called

### How to use

```js
const response = api().spin.websocket.ping({
  onOk: (data) => console.log(data),
  onError: (error) => console.error(error),
});

if (response.type === 'ERROR') {
  console.warn('Method not sended');
}

if (response.type === 'OK') {
  response.data.unsubscribe();
}
```

### 2. Subscription

Subscription its like method but more complex. It work like that:

- subscription send method `sub` and create `channel` to server
- if `sub` ok (channel created) then api create listners for websocket
- if new websocket message its for `channel` then api call corresponding subscription callbacks

```js
const response = api().spin.websocket.listenOrders(request, {
  onSubOk: (data) => console.log(data),
  onSubError: (error) => console.error(error),
});
```

Channel - its stream of websocket message that have same `subscription id` and have some format.
Messages in channel maybe different. Some channel have first uniq message and some not.
First uniq message in channel its `state` and other messages its `notification`

Websoket message match with channel by `json rpc` id created when subscription called and `subscription id`
created by server

```js
const response = api().spin.websocket.listenOrders(request, {
  onNotifyOk: (data) => console.log(data),
  onNotifyError: (error) => console.error(error),
  onStateOk: (data) => console.log(data),
  onStateError: (error) => console.error(error),
});
```

All subscription callbacks called when websocket get valid message and match channel. If websocket break
connection before subscription call or js runtime rise error then response type will be `ERROR` and
websocket listner from init steps will not be created (callbacks not be called)

```js
const response = api().spin.websocket.listenOrders(request);

if (response.type === 'ERROR') {
  console.warn('Listening not established');
}
```

Some times its needed unsubscribe from subscription. It work like that:

- subscription send method `unsub` and get response
- if response is `true` then `channel` is closed
- internal `rxjs` subscriptions its also unsubscribed
- if response is `false` then `channel` not closed
- `onUnsubError` handle `false` branch

```js
const response = api().spin.websocket.listenOrders(request, {
  onSubError: (error) => console.error(error),
  onUnsubError: (error) => console.error(error),
});

if (response.type === 'ERROR') {
  console.warn('Listening not established');
}

if (response.type === 'OK') {
  response.data.unsubscribe();
}
```
