import { IOption } from 'interfaces/common'
import { IRoomFilterItem } from 'interfaces/listing'
import { IProperty } from 'interfaces/property'
import { getShortAddress, getValidArray } from 'utils/common'

export function getHouseOptionSelect(houseList?: IProperty[]): IOption[] {
  let houseOptions: IOption[] = []
  let houses: string[] = []
  getValidArray(houseList).forEach((house: IProperty) => {
    if (!houses.includes(String(house?.buildiumPropertyId ?? '')) && house?.buildiumPropertyId && house?.address) {
      houses = houses.concat(String(house.buildiumPropertyId))
      houseOptions = [
        ...houseOptions,
        {
          value: String(house.buildiumPropertyId),
          label: `${house.buildiumPropertyId} - ${getShortAddress(house.address)}`
        }
      ]
    }
  })
  return houseOptions
}

export function getHouseFilter(houseId: string, houseList: IProperty[]): IOption {
  let houseOptionLabel = ''
  const houses: IProperty[] = getValidArray(houseList).filter((house: IProperty) => {
    return Number(houseId) === house?.buildiumPropertyId ?? 0
  })
  if (houses.length > 0) {
    houseOptionLabel = `${houses[0].buildiumPropertyId} - ${getShortAddress(houses[0]?.address ?? '')}`
  }
  const houseFilter: IOption = {
    value: houseId,
    label: houseOptionLabel
  }
  return houseFilter
}

export function getPriceOptionByValue(price: string, priceList: IRoomFilterItem[]): IOption | undefined {
  const foundPriceItem: IRoomFilterItem | undefined = getValidArray(priceList).find((item) => item.value === price)
  if (foundPriceItem) {
    return {
      label: foundPriceItem.title,
      value: foundPriceItem.value
    } as IOption
  }
  return undefined
}
