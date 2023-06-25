import Icon from 'components/Icon'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { ForwardedRef } from 'react'
import { DatePickerText, DatePickerWrapper } from './DatePicker.styles'
dayjs.extend(advancedFormat)

interface IDatePickerProps {
  value: Date
  onClick: () => {}
}

export const CustomDatePicker = (props: IDatePickerProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { value, onClick } = props
  return (
    <DatePickerWrapper onClick={onClick} ref={ref}>
      <DatePickerText>{String(value) ?? 'Move-in date'}</DatePickerText>
      <Icon iconName="date.svg" width={20} height={20} onClick={onClick} />
    </DatePickerWrapper>
  )
}
export default CustomDatePicker
