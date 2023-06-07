export interface IMockBook {
  title?: string
  author?: string[]
  price?: number
  bonusPointPrice?: number
  bookStatus?: string
  bookImages?: string
}

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
    bookImages: 'https://m.media-amazon.com/images/I/81TkpoPjOyL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: 'My Book',
    author: ['Me Name'],
    price: 100,
    bonusPointPrice: 10,
    bookStatus: 'unavailable',
    bookImages: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
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

export enum EBookStatusEnum {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  RENTED = 'rented'
}
