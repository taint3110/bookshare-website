import { EBookConditionEnum, EBookCoverEnum, EBookStatusEnum } from "enums/book"

//*INFO: Unit is room in house
export interface IBook {
  id?: string
  title?: string
  price?: number
  author?: string[]
  description?: string
  bonusPointPrice?: number
  publisher?: string
  releaseDate?: Date
  bookCover?: EBookCoverEnum
  bookCondition?: EBookConditionEnum
  bookStatus?: EBookStatusEnum
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface IBookWithRelations extends IBook {
  
}
