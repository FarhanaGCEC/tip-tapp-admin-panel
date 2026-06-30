export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P]
}

export type TomSettings = {
  plugins?: Record<string, unknown>
  persist?: boolean
  create?: boolean
  onDelete?: (values: string[]) => boolean
  onOptionAdd?: (value: string | number) => void
  [key: string]: unknown
}
