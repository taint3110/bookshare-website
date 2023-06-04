import { createContext, RefObject } from 'react'

interface ICMSLayoutContext {
  isSidebarCollapsed?: boolean
  sideBarRef?: RefObject<HTMLDivElement>
}

export const CMSLayoutContext = createContext<ICMSLayoutContext>({} as ICMSLayoutContext)
