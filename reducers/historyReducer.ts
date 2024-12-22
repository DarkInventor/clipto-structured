import { Scene } from '../types'

export interface HistoryState {
  past: Array<{ scenes: Scene[] }>;
  present: { scenes: Scene[] };
  future: Array<{ scenes: Scene[] }>;
}

export const initialHistoryState: HistoryState = {
  past: [],
  present: { scenes: [] },
  future: []
}

type HistoryAction =
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'UPDATE_SCENES'; scenes: Scene[] }

export function historyReducer(state: HistoryState, action: HistoryAction): HistoryState {
  switch (action.type) {
    case 'UNDO':
      if (state.past.length === 0) return state
      const previous = state.past[state.past.length - 1]
      const newPast = state.past.slice(0, state.past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future]
      }
    case 'REDO':
      if (state.future.length === 0) return state
      const next = state.future[0]
      const newFuture = state.future.slice(1)
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture
      }
    case 'UPDATE_SCENES':
      return {
        past: [...state.past, state.present],
        present: { scenes: action.scenes },
        future: []
      }
    default:
      return state
  }
}

