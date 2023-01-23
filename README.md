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
const {spin} = await createApi({
  accountId: 'some account id value',
  privateKey: 'some private key value',
});
```

# @spinfi/core

Spin core create spin api instace that work exactly in browser and node.js

```js
const response = await spin.depositFt(request);
```

## Websocket

Websocket property provide functions to call `spin` off-chain methods by websocket

Websocket method divided in two types:

- method (similar to async call with callback)
- subscription

### 1. Method

Method require some parameters in `json rpc` format and return some data with `onOk` callback.
If websocket return not expected data format - api will ignore it. If websocket return correct
message without connection/js error, but with error field - data handled by `onError` callback

### How to use

```js
const unsubscribe = spin.ping({
  onOk: (data) => console.log(data),
  onError: (error) => console.error(error),
});
```

### 2. Subscription

Subscription its like method but more complex. It work like that:

- subscription send method `sub` and create `channel` to server
- if `sub` ok (channel created) then api create listners for websocket
- if new websocket message its for `channel` then api call corresponding subscription callbacks

```js
const unsubscribe = spin.listenOrders(request, {
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
const unsubscribe = spin.listenOrders(request, {
  onNotifyOk: (data) => console.log(data),
  onNotifyError: (error) => console.error(error),
  onStateOk: (data) => console.log(data),
  onStateError: (error) => console.error(error),
});
```

Some times its needed unsubscribe from subscription. It work like that:

- subscription send method `unsub` and get response
- if response is `true` then `channel` is closed
- internal `rxjs` subscriptions its also unsubscribed
- if response is `false` then `channel` not closed
- `onUnsubError` handle `false` branch

```js
const unsubscribe = spin.listenOrders(request, {
  onSubError: (error) => console.error(error),
  onUnsubError: (error) => console.error(error),
});
```
