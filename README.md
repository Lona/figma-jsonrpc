# figma-JSONRPC

Leverage [JSON-RPC](https://www.jsonrpc.org) to communicate between your Figma plugin and your Figma UI.

## Installation

```bash
npm install figma-jsonrpc
```

## Usage

- Define your API in a separate file (in `api.ts` for example):

  ```ts
  import rpc from "figma-jsonrpc";

  // those methods will be executed in the Figma plugin,
  // regardless of where they are called from
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

  // those methods will be executed in the Figma UI,
  // regardless of where they are called from
  export const uiApi = rpc(
    {
      selectionChanged(selection) {
        return "pong";
      }
    },
    { defineOnUI: true }
  );
  ```

- Use the UI API in the plugin:

  ```ts
  import { uiApi } from "./api";

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__);

  figma.on("selectionchange", () => {
    uiApi.selectionChange(figma.currentPage.selection);
  });
  ```

- Use the API in the UI:

  ```ts
  import { api } from "./api";

  const pong = await api.ping();
  const token = await api.getToken();
  await api.setToken("new token");
  ```

The typescript definition of the API is automatically inferred from the methods passed to `rpc` :sparkles:.

> :warning: You always need to import the API in both the plugin and the UI, even if you aren't using it. It is necessary so that both part can handle calls from each other.

## License

MIT
