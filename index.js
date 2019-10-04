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

  return Object.keys(methods).reduce((prev, p) => {
    prev[p] = (...params) => sendRequest(p, params);
    return prev;
  }, {});
};
