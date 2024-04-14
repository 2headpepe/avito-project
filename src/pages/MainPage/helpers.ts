type FuncType<T extends unknown[]> = (...args: T) => void;
export function debounce<T extends unknown[]>(
  func: FuncType<T>,
  wait: number
): FuncType<T> {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...args: T) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
