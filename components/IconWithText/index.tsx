import { Box } from '@chakra-ui/react'
import React from 'react'
import Icon from '../Icon'
import { IconWithTextWrapper, Label } from './iconWithText.styles'

export interface IIconWithTextProps {
  iconName: string
  label?: string
  onClick?: () => void
  innerRef?: React.LegacyRef<HTMLDivElement>
  size?: number
  width?: number
  height?: number
  className?: string
  iconClassName?: string
  color?: string
  spacing?: number | string
}
const IconWithText = (props: IIconWithTextProps) => {
  const {
    iconName,
    label,
    innerRef,
    width,
    height,
    size,
    className,
    color = 'gray.800',
    iconClassName,
    spacing = 2,
    onClick
  } = props
  return (
    <IconWithTextWrapper
      ref={innerRef}
      onClick={onClick}
      className={className || 'icon-with-text__wrapper'}
      spacing={spacing}
    >
      <Box textAlign="center" height={`${height ?? size}px`} width={`${width ?? size}px`}>
        <Icon width={width} height={height} size={size} iconName={iconName} className={iconClassName} />
      </Box>
      <Label color={color} isTruncated>
        {label}
      </Label>
    </IconWithTextWrapper>
  )
}
export default IconWithText
