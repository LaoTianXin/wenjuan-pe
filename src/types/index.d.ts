type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? A
  : B
type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T]

type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>
}[keyof T]

declare type PickReadonly<T> = Pick<T, ReadonlyKeys<T>>
declare type PickWritable<T> = Pick<T, WritableKeys<T>>

declare type CommonAttributes<T, R> = {
  [K in Extract<keyof T, keyof R>]: T[K] & R[K]
}
