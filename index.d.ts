/**
 * Create a set of methods that will be executed on the UI,
 * regarless of where they are called from.
 */
export function createUIAPI<
  T extends { [method: string]: (...args: any[]) => any | Promise<any> }
>(
  methods: T,
  options?: { timeout?: number }
): Readonly<
  {
    [K in keyof T]: (
      ...args: Parameters<T[K]>
    ) => ReturnType<T[K]> extends Promise<infer U>
      ? ReturnType<T[K]>
      : Promise<ReturnType<T[K]>>;
  }
>;

/**
 * Create a set of methods that will be executed on the plugin,
 * regarless of where they are called from.
 */
export function createPluginAPI<
  T extends { [method: string]: (...args: any[]) => any | Promise<any> }
>(
  methods: T,
  options?: { timeout?: number }
): Readonly<
  {
    [K in keyof T]: (
      ...args: Parameters<T[K]>
    ) => ReturnType<T[K]> extends Promise<infer U>
      ? ReturnType<T[K]>
      : Promise<ReturnType<T[K]>>;
  }
>;
