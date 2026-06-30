import TomSelectPlugin from 'tom-select'
import { TomSettings, RecursivePartial } from '../../../../../../types/tom-select'

export interface TomSelectElement extends HTMLSelectElement {
  TomSelect: TomSelectPlugin
}

export interface TomSelectProps
  extends Omit<
    React.PropsWithChildren & React.ComponentPropsWithoutRef<'select'>,
    'onChange'
  > {
  value: string | string[]
  onOptionAdd: (value: string) => void
  onChange(
    value: React.SetStateAction<string> | React.SetStateAction<string[]>
  ): void
  options: RecursivePartial<TomSettings>
  getRef: (el: TomSelectElement) => void
}
