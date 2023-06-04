export type BaseStyle = Record<string, any>
export type CommonError = any
export type ICoordinate = [number, number]
export interface PaginationList<T> {
  results: T[]
  totalCount: number
}

declare global {
  interface Window {
    Atlas: any
    gtag: any
    amplitude: any
  }
}
