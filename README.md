# figma-JSONRPC

Leverage [JSON-RPC](https://www.jsonrpc.org) to communicate between your Figma plugin and your Figma UI.

## Installation

```bash
npm install figma-jsonrpc
```

## Usage

- Define your API in a separate file (in `api.ts` for example):

  ```js
  import rpc from "figma-jsonrpc";

  export const api = rpc({
    ping() {
      return "pong";
    },
    setToken(token: string) {
      return figma.clientStorage.setAsync("token", token);
    },
    getToken() {
      return figma.clientStorage.getAsync("token");
    }
  });
  ```

- Import the API in your plugin (so that it can respond to it):

  ```js
  import "./api";

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__);
  ```

- Use the API in the UI of the plugin:

  ```js
  import { api } from "./api";

  const pong = await api.ping();
  const token = await api.getToken();
  await api.setToken("new token");
  ```

The typescript definition of the API is automatically inferred from the methods passed to `rpc`.

## License

MIT
