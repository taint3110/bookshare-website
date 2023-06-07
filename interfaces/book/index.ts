
//*INFO: Unit is room in house
export interface IBook {
  id: string
  title?: string
  price?: number
  author?: string[]
  description?: string
  bonusPointPrice?: number
  publisher?: string
  releaseDate?: Date
  // bookCover?: 
  // bookCondition?:
  // bookStatus?:
}

export interface IBookWithRelations extends IBook {
  
}
