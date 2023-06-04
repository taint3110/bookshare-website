import routes from 'routes'

export enum CMSPageName {
  GENERAL_SETTINGS = 'General Settings',
  PROPERTY = 'Property Management',
  INFORMATION = 'Owner Portal Information',
  APPLICATION = 'Applications',
  ACCOUNT = 'Account Management'
}

export enum CMSInformationPageName {
  OWNER = 'Owner Management',
  FINANCIAL = 'Financials Uploader',
  LEASES = 'Leases Management',
  INVOICE = 'Invoice Management',
  PAYMENT = 'Owner Payment Tracker'
}

export const cmsPropertyManagementRoute = {
  house: `${routes.cms.propertyManagement.value}?index=0&page=1`,
  room: `${routes.cms.propertyManagement.value}?index=1&page=1`,
  generalInformation: `${routes.cms.propertyManagement.value}?index=2&page=1`
}

export const generalSettingsRoute = {
  websiteContent: `${routes.cms.generalSettings.value}?index=0&page=1`,
  activateCrawlerService: `${routes.cms.generalSettings.value}?index=1&page=1`,
  metropolitans: `${routes.cms.generalSettings.value}?index=2&page=1`
}

export enum CMSApplicationPageName {
  APPLICANT = 'Applicant Management',
  POLICY_SETTING = 'Policy Settings'
}
