import { EBookConditionEnum, EBookCoverEnum, EBookStatusEnum } from "enums/book"
import { ISeries } from 'interfaces/series'

//*INFO: Unit is room in house
export interface IBook {
  id?: string
  title?: string
  price?: number
  author?: string[] | string
  description?: string
  bonusPointPrice?: number
  publisher?: string
  releaseDate?: Date
  availableStartDate?: Date
  availableEndDate?: Date
  bookCover?: EBookCoverEnum
  bookCondition?: EBookConditionEnum
  bookStatus?: EBookStatusEnum
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
  seriesId?: string
}

export interface IBookWithRelations extends IBook {
  series?: ISeries
}
