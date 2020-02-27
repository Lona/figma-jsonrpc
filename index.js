const { setup, sendRequest } = require("./rpc");
const { MethodNotFound } = require("./errors");

module.exports.createUIAPI = function createUIAPI(methods, options) {
  const timeout = options && options.timeout;

  if (typeof parent !== "undefined") {
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
      if (typeof parent !== "undefined") {
        return Promise.resolve().then(() => methods[p](...params));
      }
      return sendRequest(p, params, timeout);
    };
    return prev;
  }, {});
};

module.exports.createPluginAPI = function createPluginAPI(methods, options) {
  const timeout = options && options.timeout;

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
    prev[p] = (...params) => {
      if (typeof figma !== "undefined") {
        return Promise.resolve().then(() => methods[p](...params));
      }
      return sendRequest(p, params, timeout);
    };
    return prev;
  }, {});
};
