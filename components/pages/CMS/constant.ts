import routes from 'routes'

export enum CMSPageName {
  BOOK = 'Book Management',
  ORDER = 'Order Management',
  ACCOUNT = 'Account Management'
}

export const cmsPropertyManagementRoute = {
  house: `${routes.cms.bookManagement.value}?index=0&page=1`,
  room: `${routes.cms.bookManagement.value}?index=1&page=1`,
  generalInformation: `${routes.cms.bookManagement.value}?index=2&page=1`
}