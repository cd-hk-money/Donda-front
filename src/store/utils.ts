
export interface StoreState<T = any> {
  data: T
  error: any
  loading: boolean
}

export const initialState = <T>(initial?: T): StoreState<T> => ({
  data: initial || null,
  error: null,
  loading: false
})