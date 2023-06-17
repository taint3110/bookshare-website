export interface IMockBook {
  title?: string
  author?: string[]
  price?: number
  bonusPointPrice?: number
  bookStatus?: string
  bookImages?: string
  categories?: IMockCategory[]
  condition: EBookConditionEnum
  cover: EBookCoverEnum
}

export enum EBookStatusEnum {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  RENTED = 'rented'
}

export enum EBookCoverEnum {
  SOFT = 'soft',
  HARD = 'hard'
}

export enum EBookConditionEnum {
  NEW = 'new',
  OLD = 'old',
  DAMAGED = 'damaged'
}

export const MockBookConditions = Object.values(EBookConditionEnum)
export const MockBookCovers = Object.values(EBookCoverEnum)

export interface IMockCategory {
  name: string
  image: string
}

export const mockBooks: IMockBook[] = [
  {
    title: 'Tomie',
    author: ['Junji Ito'],
    price: 100,
    bonusPointPrice: 10,
    bookStatus: 'available',
    bookImages: 'https://m.media-amazon.com/images/I/81TkpoPjOyL._AC_UF1000,1000_QL80_.jpg',
    categories: [
      {
        name: 'horror',
        image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
      },
      {
        name: 'manga',
        image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
      }
    ],
    condition: EBookConditionEnum.NEW,
    cover: EBookCoverEnum.HARD
  },
  {
    title: 'My Book',
    author: ['Me Name'],
    price: 80,
    bonusPointPrice: 8,
    bookStatus: 'unavailable',
    bookImages: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
    categories: [
      {
        name: 'textbook',
        image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
      },
      {
        name: 'manga',
        image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
      }
    ],
    condition: EBookConditionEnum.DAMAGED,
    cover: EBookCoverEnum.SOFT
  }
]

export const mockCategories: IMockCategory[] = [
  {
    name: 'comedy',
    image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
  },
  {
    name: 'horror',
    image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
  },
  {
    name: 'detective',
    image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
  },
  {
    name: 'manga',
    image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
  },
  {
    name: 'textbook',
    image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
  },
  {
    name: 'cooking',
    image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
  }
]
