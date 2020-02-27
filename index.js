const { setup, sendRequest } = require("./rpc");
const { MethodNotFound } = require("./errors");

module.exports = function rpc(methods, options) {
  const defineOnUI = options && options.defineOnUI;
  const timeout = options && options.timeout;

  if (!defineOnUI && typeof figma !== "undefined") {
    setup({
      onRequest(method, params) {
        if (!methods[method]) {
          throw new MethodNotFound();
        }
        return methods[method](...params);
      }
    });
  } else if (defineOnUI && typeof parent !== "undefined") {
    setup({
      onRequest(method, params) {
        if (!methods[method]) {
          throw new MethodNotFound();
        }
        return methods[method](...params);
      }
    });
  }

  return Object.keys(methods).reduce((prev, p) => {
    prev[p] = (...params) => {
      if (!defineOnUI && typeof figma !== "undefined") {
        return Promise.resolve().then(() => methods[p](...params));
      } else if (defineOnUI && typeof parent !== "undefined") {
        return Promise.resolve().then(() => methods[p](...params));
      }
      return sendRequest(p, params, timeout);
    };
    return prev;
  }, {});
};
