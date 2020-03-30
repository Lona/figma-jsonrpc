# figma-JSONRPC

Leverage [JSON-RPC](https://www.jsonrpc.org) to communicate between your [Figma](https://www.figma.com/) plugin and your Figma UI.

## Installation

```bash
npm install figma-jsonrpc
```

## Usage

- Define your API in a separate file (in `api.ts` for example):

  ```ts
  import { createPluginAPI, createUIAPI } from "figma-jsonrpc";

  // those methods will be executed in the Figma plugin,
  // regardless of where they are called from
  export const api = createPluginAPI({
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
  export const uiApi = createUIAPI({
    selectionChanged(selection) {
      return "pong";
    }
  });
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

## One more thing...

Using React? There are a couple of treats for you.

Two React hooks you can use in your UI which will setup the necessary APIs for you.

- `useFigmaSelection`: get and set the current [Figma selection](https://www.figma.com/plugin-docs/api/properties/PageNode-selection/#docsNav)

  ```js
  import useFigmaSelection from "figma-jsonrpc/hooks/useFigmaSelection";

  const Component = () => {
    const [selection, setSelection] = useFigmaSelection();
  };
  ```

- `useFigmaSetting`: get and set any [setting](https://www.figma.com/plugin-docs/api/figma-clientStorage/)

  ```js
  import useFigmaSetting from "figma-jsonrpc/hooks/useFigmaSetting";

  const Component = () => {
    const [token, error, loading, setToken] = useFigmaSetting("token");
  };
  ```

In both cases, you also need to import `figma-jsonrpc/hooks/*` in your plugin to create the APIs.

## License

MIT
