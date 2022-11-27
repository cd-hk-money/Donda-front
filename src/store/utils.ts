
export interface StoreState<T = any> {
  data: T
  error: any
  loading: boolean
}

export const initialState = <T>(initial?: T): StoreState<T> => ({
  data: initial,
  error: null,
  loading: false
})