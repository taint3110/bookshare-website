import { IMedia } from 'interfaces/media'

//*INFO: Unit is room in house
export interface ICategory {
  id?: string
  name?: string
  description?: string
  media?: IMedia
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface ICategoryWithRelations extends ICategory {}
