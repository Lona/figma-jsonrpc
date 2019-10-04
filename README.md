# figma-JSONRPC

Leverage [JSON-RPC](https://www.jsonrpc.org) to communicate between your Figma plugin and your Figma UI.

## Installation

```bash
npm install figma-jsonrpc
```

## Usage

You can use the same API in both your plugin and your UI.

```js
import { setup, sendNotification, sendRequest } from "figma-jsonrpc";
import { MethodNotFound } from "figma-jsonrpc/errors";

setup({
  onNotification(method, params) {
    // handle a notification
  },
  onRequest(method, params) {
    // handle a request
    switch (method) {
      case "ping":
        // can either return a result directly
        return "pong";
      case "pong":
        // or return a Promise
        return Promise.resolve("ping");
      default:
        throw new MethodNotFound();
    }
  }
});

sendRequest("ping")
  .then(pong => {
    sendNotification("pong", { msg: pong });
  })
  .catch(err => {
    // something bad happened
  });
```

## License

MIT
