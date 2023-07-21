import { IMetro } from 'interfaces/metro'
import { IFooterNavLink, INavLinkItem } from 'interfaces/navigation'
import routes from 'routes'
import { getValidArray } from 'utils/common'
import { renters } from './constants'

export function getLocationsLinks(metroList?: IMetro[]): INavLinkItem[] {
  const links: INavLinkItem[] = getValidArray(metroList).map((metro: IMetro) => {
    return {
      text: `${metro?.name} ${metro?.state}`,
      link: `${routes.home.value}?metro=${encodeURIComponent(metro.name ?? '')}`
    }
  })
  return links
}

export function getLocationFooterLinks(metroList?: IMetro[]): IFooterNavLink {
  return {
    title: 'Locations',
    links: getLocationsLinks(metroList)
  }
}

export function getTabletFooterLinks(metroList?: IMetro[]): IFooterNavLink[] {
  return [
    // {
    //   ...realEstateInvestors
    // },
    {
      ...getLocationFooterLinks(metroList)
    }
  ]
}

export function getDesktopFooterLinks(): IFooterNavLink[] {
  return [
    // {
    //   ...renters
    // },
    // {
    //   ...realEstateInvestors
    // }
  ]
}
