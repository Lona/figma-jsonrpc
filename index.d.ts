export default function rpc<
  T extends { [method: string]: (...args: any[]) => any | Promise<any> }
>(
  methods: T
): Readonly<
  {
    [K in keyof T]: (
      ...args: Parameters<T[K]>
    ) => ReturnType<T[K]> extends Promise<infer U>
      ? ReturnType<T[K]>
      : Promise<ReturnType<T[K]>>;
  }
>;
