export type NotStartingWith<
  Set,
  Needle extends string,
> = Set extends `${Needle}${infer _X}` ? never : Set

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {}
