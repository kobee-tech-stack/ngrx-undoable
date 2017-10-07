import {
  UndoableAction,
  RedoAction,
  UndoAction
} from '../undoable.action'


/**
 * A simple Redux Action
 */
export interface Action {
  type      : string
  payload?  : any
}


/**
 * The Reducer which is passed to the Undoable Reducer.
 * 
 * @template S State object type.
 * @template A Action object type.
 * 
 */
export interface Reducer<S, A extends Action> {
  (state: Readonly<S>, action: A | Action): S
}

/**
 * The State object type of the undoable reducer
 * 
 * @template S State object type.
 * @template A Action object type.
 * 
 * @member past An Array of Action objects that represent the past in the order: [oldest, latest]
 * @member present The current State
 * @member future An Array of Action objects that represent the future in the order: [latest, oldest]
 * 
 */
export interface Undoable<S, A extends Action> {
  past    : A[]
  present : S
  future  : A[]
}


// action should be `UndoableAction | A` but this ruins type safety inside the undoable reducer
/**
 * The undoable higher order reducer, wraps the provided reducer and
 * creates a history from it.
 * 
 * @template S State object type.
 * @template A Action object type.
 * 
 */
export interface UndoableReducer {
  <S, A extends Action, I extends Action>(reducer: Reducer<S, A | Action>, initAction: I, limits?: Limits, comparator?: Comparator<S>): (state: Undoable<S, A | Action> | Undoable<S, Action>, action: A | Action) => Undoable<S, A | Action> | Undoable<S, Action>
}


/**
 * 
 * A function which compares two states in order to detect state changes.
 * If it evaluates to true, the action history is not updated and the state is returned.
 * If it evaluates to false, the action history is updated and the new state is returned.
 * The default comparator uses strict equality (s1, s2) => s1 === s2.
 * To add every action to the history one would provide the comparatar (s1, s2) => false.
 * 
 * @template S State object type.
 * 
 */
export type Comparator<S> = (s1: S, s2: S) => boolean


/**
 * The Limits of the undoable reducer.
 * Defaults are infinite.
 * 
 * To limit the history to 10 one would choose { past: 10, future: 10 }
 * 
 * Future and past can also differ: { past: 5, future: 10 }
 * 
 * Or limit only one: { past: 45 }
 * 
 * If a limit is reached, the oldest object in past/future is dropped.
 */
export interface Limits {
  past?   : number
  future? : number
}