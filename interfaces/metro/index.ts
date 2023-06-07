export interface IMetro {
  id?: string
  name?: string
  metroId?: number
  cities?: string[]
  isActive?: boolean
  order?: number
  previousOrder?: number
  zoomLevel?: number
  imageUrl?: string
  state?: string
  numberOfProperties?: number
}

export interface IMetroWithRelations extends IMetro {
  metroPricing?: IMetroPricing
}

export interface IMetroPricing {
  id?: string
  metroId?: string
  averageRent?: number
  serviceFee?: number
  metro?: string
}

export interface IMetroPricingWithRelations extends Omit<IMetroPricing, 'metro'> {
  metro?: IMetro
}

export interface IPricingTableSettings {
  title: string
  description?: string
  note: string
}
