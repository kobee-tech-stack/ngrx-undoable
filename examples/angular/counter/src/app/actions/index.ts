export enum Count {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  INIT      = 'INIT'
}

export interface Init {
  type: Count.INIT
}

export interface Increment {
  type: Count.INCREMENT
}

export interface Decrement {
  type: Count.DECREMENT
}

export const increment = (): Increment => {
  return { type: Count.INCREMENT }
}

export const decrement = (): Decrement => {
  return { type: Count.DECREMENT }
}

export const init = (): Init => {
  return { type: Count.INIT }
}

export type CounterAction = Init | Increment | Decrement
