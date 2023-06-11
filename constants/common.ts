export const ZIP_CODE_PATTERN: RegExp = /(^\d{4,5}$)|(^\d{5}-\d{4}$)/
export const PHONE_NUMBER_PATTERN: RegExp = /^\(\d{3}\) \d{3}-\d{4}$/
export const RAW_PHONE_NUMBER_PATTERN: RegExp = /^\+?1?\s*\(?-*\.*(\d{3})\)?\.*-*\s*(\d{3})\.*-*\s*(\d{4})$/
export const NAME_PATTERN: RegExp = /^[a-zA-Z\u00C0-\u017F\s-']+$/
export const EMAIL_PATTERN: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
export const NUMBER_PATTERN: RegExp = /^(\$)?(\d+)(\.\d+)?$/
export const NUMBER_WITH_COMMA_PATTERN: RegExp = /\B(?=(\d{3})+(?!\d))/g
export const NAME_WITH_NUMBER_PATTERN: RegExp = /^[a-zA-Z0-9\u00C0-\u017F\s-']+$/

//* INFO: validate password: upper and lower case letters, at least 8 characters and must contain digits
export const PASSWORD_PATTERN: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
//* INFO: validate income: allow currency characters $ at the beginning of the string or not and allow decimal numbers with any digits after the decimal point
export const MONTHLY_INCOME_PATTERN: RegExp = /^(\$)?(\d+)(\.\d+)?$/
//*INFO: validate day: between 1 and 31
export const DAY_PATTERN: RegExp = /^(0[1-9]|[12][0-9]|3[01])$/
//*INFO: validate month: between 1 and 12
export const MONTH_PATTERN: RegExp = /^(0[1-9]|1[012])$/
//*INFO: validate year: between 1900 and 2099
export const YEAR_PATTERN: RegExp = /^(19|20)\d\d$/
//* INFO Check if dateOfBirth is valid
export const DATE_OF_BIRTH_PATTERN: RegExp =
  /^02[- /.]29[- /.]((19|20)([2468][048]|[13579][26]|0[48])|2000)|((0[469]|11)[- /.](0[1-9]|[12][0-9]|30)[- /.](19|20)[0-9]{2}|(0[13578]|1[02])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9]{2}|02[- /.](0[1-9]|1[0-9]|2[0-8])[- /.](19|20)[0-9]{2})$/
