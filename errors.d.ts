/**
 * Invalid JSON was received by the server.
 * An error occurred on the server while parsing the JSON text.
 */
export class ParseError extends Error {
  statusCode: -32700;
  data: any;
  message: "Parse error";
  constructor(data?: any);
}

/**
 * The JSON sent is not a valid Request object.
 */
export class InvalidRequest extends Error {
  message: "Invalid Request";
  data: any;
  statusCode: -32600;
  constructor(data?: any);
}

/**
 * The method does not exist / is not available.
 */
export class MethodNotFound extends Error {
  message: "Method not found";
  data: any;
  statusCode: -32601;
  constructor(data?: any);
}

/**
 * Invalid method parameter(s).
 */
export class InvalidParams extends Error {
  message: "Invalid params";
  data: any;
  statusCode: -32602;
  constructor(data?: any);
}

/**
 * Internal JSON-RPC error.
 */
export class InternalError extends Error {
  message: "Internal error";
  data: any;
  statusCode: -32603;
  constructor(data?: any);
}
