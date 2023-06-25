import { EZIndexLayer } from 'enums/theme'
import { IOption } from 'interfaces/common'

export interface IChakraInputDropdownProps {
  name: string
  label: string
  optionsData: IOption[]
  placeholder?: string
  isSearching?: boolean
  defaultValue?: IOption
  closeMenuOnSelect?: boolean
  maxTextLength?: number
  zIndex?: EZIndexLayer
}
