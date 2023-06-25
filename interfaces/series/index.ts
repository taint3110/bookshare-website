import { EBookConditionEnum, EBookCoverEnum, EBookStatusEnum } from "enums/book"
import { IBook } from "interfaces/book"

//*INFO: Unit is room in house
export interface ISeries {
  _id?: string
  id?: string
  title?: string
  author?: string[]
  description?: string
  releaseDate?: Date
  bookList?: IBook[]
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface ISeriesWithRelations extends ISeries {
  
}
