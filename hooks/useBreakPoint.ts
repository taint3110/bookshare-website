import { EBreakPoint } from 'enums/theme'
import { MediaQueryAllQueryable, useMediaQuery } from 'react-responsive'
import { breakPointValues } from 'theme/globalStyles'

type MediaQuerySettings = Partial<
  MediaQueryAllQueryable & {
    query?: string
  }
>

const getBreakPointValue = (breakPoint: EBreakPoint): string => {
  switch (breakPoint) {
    case EBreakPoint.XS:
      // INFO: using breakPoinTValue of sm because in this design we have min break point is sm
      return breakPointValues.sm
    case EBreakPoint.SM:
      return breakPointValues.sm
    case EBreakPoint.MD:
      return breakPointValues.md
    case EBreakPoint.LG:
      return breakPointValues.lg
    case EBreakPoint.XL:
      return breakPointValues.xl
    default:
      return breakPointValues.base
  }
}

const useBreakPoint = (minBreakPoint: EBreakPoint, maxBreakPoint?: EBreakPoint): boolean => {
  const minWidth: string = String(Number(getBreakPointValue(minBreakPoint).replace('px', '')) + 0.1) + 'px'
  const settings: MediaQuerySettings = { minWidth }
  if (maxBreakPoint) {
    settings.maxWidth = getBreakPointValue(maxBreakPoint)
  }
  const isMatched: boolean = useMediaQuery(settings)

  return isMatched
}

export default useBreakPoint
