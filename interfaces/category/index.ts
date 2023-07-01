import { IMedia } from 'interfaces/media'

//*INFO: Unit is room in house
export interface ICategory {
  _id?: string
  id?: string
  name?: string
  description?: string
  media?: IMedia
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
  bookId?: string
  categoryId?: string
  formMedia?: string
}

export interface ICategoryWithRelations extends ICategory {}
