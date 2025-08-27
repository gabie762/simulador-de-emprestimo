declare module 'react-test-renderer' {
  export function act(callback: () => void | Promise<void>): void;
}
