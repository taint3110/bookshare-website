import IconWithText from 'components/IconWithText'
import React from 'react'
import { ButtonWithIconWrapper } from './buttonWithIcon.styles'

export interface IButtonWithIconProps {
  iconName: string
  label?: string
  onClick?: () => void
  innerRef?: React.LegacyRef<HTMLDivElement>
  size?: number
  width?: number
  height?: number
  zIndex?: number
  color?: string
  border?: string
}
const ButtonWithIcon = (props: IButtonWithIconProps) => {
  const { iconName, label, onClick, innerRef, width, height, size, zIndex, color, border } = props
  return (
    <ButtonWithIconWrapper border={border} ref={innerRef} onClick={onClick} zIndex={zIndex}>
      <IconWithText
        color={color}
        iconName={iconName}
        label={label}
        size={size}
        width={width}
        height={height}
        className={`button-with-icon__icon--${width ?? size}w`}
        spacing={0}
      />
    </ButtonWithIconWrapper>
  )
}
export default ButtonWithIcon
