export default function rpc<
  T extends { [method: string]: (...args: any[]) => any | Promise<any> }
>(
  methods: T,
  options?: { timeout?: number; defineOnUI?: boolean }
): Readonly<
  {
    [K in keyof T]: (
      ...args: Parameters<T[K]>
    ) => ReturnType<T[K]> extends Promise<infer U>
      ? ReturnType<T[K]>
      : Promise<ReturnType<T[K]>>;
  }
>;
