export enum EnvironmentEnum {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  LOCAL = 'local'
}

export enum LocalStorageKeyEnum {
  REFERRER = 'referer',
  PHONE_NUMBER = 'phoneNumber',
  LAST_VIEWED_PROPERTY_ID = 'lastViewedPropertyId',
  REFRESH_TOKEN = 'refreshToken',
  IS_SIDEBAR_COLLAPSED = 'isSidebarCollapsed'
}

export enum ESessionStorageKey {
  APPLICATION_FORM_COMPLETED_STEP = 'lastCompletedStep',
  APPLICATION_FORM_COMPLETED_STATE = 'lastCompletedState'
}

export enum StorageType {
  LOCAL_STORAGE = 'localStorage',
  SESSION_STORAGE = 'sessionStorage',
  COOKIES = 'cookies',
  NONE = 'none'
}

export enum EAlignEnum {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center'
}

export enum EScrollDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  BOTH = 'both'
}
