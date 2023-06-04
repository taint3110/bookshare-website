import { ECountryCode, ECountryDialCode, ECountryName } from '../../constant'

export interface ICountry {
  name: ECountryName
  code: ECountryCode
  dialCode: ECountryDialCode
}

export const countries: ICountry[] = [
  {
    name: ECountryName.US,
    code: ECountryCode.US,
    dialCode: ECountryDialCode.US
  },
  {
    name: ECountryName.GB,
    code: ECountryCode.GB,
    dialCode: ECountryDialCode.GB
  },
  {
    name: ECountryName.VN,
    code: ECountryCode.VN,
    dialCode: ECountryDialCode.VN
  }
]
