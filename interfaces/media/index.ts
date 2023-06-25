//*INFO: Unit is room in house
export interface IMedia {
  id?: string
  fileName?: string
  imageUrl?: string[]
  order?: string
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface IMediaWithRelations extends IMedia {}
