/// SOURCE : https://stackoverflow.com/a/46700791/16802208
export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}
