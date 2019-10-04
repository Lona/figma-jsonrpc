/**
 * Setup the server part of the RPC.
 * The 2 callbacks are called when the client calls `sendNotification` or `sendRequest`.
 */
export function setup(callbacks?: {
  /**
   * Handle a Notification sent by a client.
   *
   * @param {string} method - A String containing the name of the method invoked.
   * @param {any} [params] - A Structured value that holds the parameter values.
   */
  onNotification?: (method: string, params: unknown) => void;
  /**
   * Handle a Request sent by a client.
   *
   * @param {string} method - A String containing the name of the method invoked.
   * @param {any} [params] - A Structured value that holds the parameter values.
   */
  onRequest?: (method: string, params: unknown) => any | Promise<any>;
}): void;

/**
 * Send a Notification to the server.
 *
 * @param {string} method - A String containing the name of the method to be invoked.
 * @param {any} [params] - A Structured value that holds the parameter values to be used during the invocation of the method.
 */
export function sendNotification(method: string, params?: any): void;

/**
 * Send a Request to the server.
 *
 * @param {string} method - A String containing the name of the method to be invoked.
 * @param {any} [params] - A Structured value that holds the parameter values to be used during the invocation of the method.
 * @param {number} [timeout=3000] - The number of milliseconds after which the request will fail if it hasn't been answered. Default to 3000.
 */
export function sendRequest(
  method: string,
  params?: any,
  timeout?: number
): Promise<unknown>;
