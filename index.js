const { setup, sendRequest } = require("./rpc");
const { MethodNotFound } = require("./errors");

module.exports = function rpc(methods) {
  if (typeof figma !== "undefined") {
    setup({
      onRequest(method, params) {
        if (!methods[method]) {
          throw new MethodNotFound();
        }
        return methods[method](...params);
      }
    });
  }

  return new Proxy(methods, {
    set() {
      return false;
    },
    get(target, p, receiver) {
      if (typeof p !== "string") {
        return;
      }
      return (...params) => sendRequest(p, params);
    }
  });
};
