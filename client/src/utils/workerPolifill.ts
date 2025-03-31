// worker-polyfill.ts
if (typeof window === 'undefined') {
  (globalThis as any).window = self;
}
