type UnaryFunc<A, B> = (a: A) => B

export const pipe = Symbol('pipe')

// prettier-ignore
export type PipeType = {
  <A>(this: A): A
  <A, B>(this: A, f1: (a: A) => B): B
  <A, B, C>(this: A, f1: (a: A) => B, f2: (b: B) => C): C
  <A, B, C, D>(this: A, f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D): D
  <A, B, C, D, E>(this: A, f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E): E
  <A, B, C, D, E, F>(this: A, f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F): F
  <A, B, C, D, E, F, G>(this: A, f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => G): G
  <A, B, C, D, E, F, G, H>(this: A, f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => G, f7: (g: G) => H): H
  <A, B, C, D, E, F, G, H, I>(this: A, f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => G, f7: (g: G) => H, f8: (h: H) => I): I
  <A, B, C, D, E, F, G, H, I, J>(this: A, f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => G, f7: (g: G) => H, f8: (h: H) => I, f9: (i: I) => J): J
  <A, B, C, D, E, F, G, H, I, J>(this: A, f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => G, f7: (g: G) => H, f8: (h: H) => I, f9: (i: I) => J, ...fs: UnaryFunc<any, any>[]): any
}

export interface Pipable {
  [pipe]: PipeType
}

type PipelineFunc<A extends any[], B> = (...args: A) => B

export function pipeline<A extends any[], B>(f1: (...args: A) => B): PipelineFunc<A, B>
export function pipeline<A extends any[], B, C>(f1: (...args: A) => B, f2: (b: B) => C): PipelineFunc<A, C>
// prettier-ignore
export function pipeline<A extends any[], B, C, D>(f1: (...args: A) => B, f2: (b: B) => C, f3: (c: C) => D): PipelineFunc<A, D>
// prettier-ignore
export function pipeline<A extends any[], B, C, D, E>(f1: (...args: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E): PipelineFunc<A, E>
// prettier-ignore
export function pipeline<A extends any[], B, C, D, E, F>(f1: (...args: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F): PipelineFunc<A, F>
// prettier-ignore
export function pipeline<A extends any[], B, C = any>(f1: (...args: A) => B, ...fs: UnaryFunc<any, any>[]): PipelineFunc<A, C> {
  return (...args: A) => fs.reduce<any>((v, f) => f(v), f1(...args)) as C
}

declare global {
  interface Object extends Pipable {
    [pipe]: PipeType
  }
}

function pipeFunc<A, B>(this: A, ...fs: UnaryFunc<any, any>[]): B {
  return fs.reduce<any>((v, f) => f(v), this) as B
}

Object.defineProperty(Object.prototype, pipe, {
  configurable: false,
  enumerable: false,
  writable: false,
  value: pipeFunc
})
