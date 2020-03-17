export default function useFigmaSetting<T>(
  key: string
): [
  readonly (T | null),
  readonly (Error | null),
  readonly boolean,
  (newSettingValue: T) => void
];
