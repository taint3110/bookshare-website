//*INFO: Unit is room in house
export interface IMedia {
  _id?: string
  id?: string
  fileName?: string
  imageUrl?: string
  order?: string
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
  bookId?: string
  categoryId?: string
  seriesId?: string
}

export interface IMediaWithRelations extends IMedia {}
