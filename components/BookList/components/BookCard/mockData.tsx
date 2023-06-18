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
  },
  {
    title: 'The Fall of Iromouth',
    author: ['Thalia Blake'],
    price: 80,
    bonusPointPrice: 8,
    bookStatus: 'unavailable',
    bookImages: 'https://i.pinimg.com/originals/a2/0f/ed/a20fedf3c81c1aff08b9eaf779442bd0.jpg',
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
  },
  {
    title: 'Sisters',
    author: ['Daisy Johnson'],
    price: 80,
    bonusPointPrice: 8,
    bookStatus: 'available',
    bookImages: 'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/W2ESGDHDBQI6VAMBMBXGAO5RYQ.jpg',
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
  },
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
  },
  {
    title: 'The Fall of Iromouth',
    author: ['Thalia Blake'],
    price: 80,
    bonusPointPrice: 8,
    bookStatus: 'unavailable',
    bookImages: 'https://i.pinimg.com/originals/a2/0f/ed/a20fedf3c81c1aff08b9eaf779442bd0.jpg',
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
  },
  {
    title: 'Sisters',
    author: ['Daisy Johnson'],
    price: 80,
    bonusPointPrice: 8,
    bookStatus: 'available',
    bookImages: 'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/W2ESGDHDBQI6VAMBMBXGAO5RYQ.jpg',
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
  },
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
  },
  {
    title: 'The Fall of Iromouth',
    author: ['Thalia Blake'],
    price: 80,
    bonusPointPrice: 8,
    bookStatus: 'unavailable',
    bookImages: 'https://i.pinimg.com/originals/a2/0f/ed/a20fedf3c81c1aff08b9eaf779442bd0.jpg',
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
  },
  {
    title: 'Sisters',
    author: ['Daisy Johnson'],
    price: 80,
    bonusPointPrice: 8,
    bookStatus: 'available',
    bookImages: 'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/W2ESGDHDBQI6VAMBMBXGAO5RYQ.jpg',
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
    image: 'https://cdn-amz.woka.io/images/I/71vmpcJWq7L.jpg'
  },
  {
    name: 'horror',
    image: 'https://content.wepik.com/statics/5394216/preview-page0.jpg'
  },
  {
    name: 'detective',
    image: 'https://beetifulbookcovers.com/wp-content/uploads/2017/10/LondonDetective.jpg'
  },
  {
    name: 'manga',
    image: 'https://cdn-amz.woka.io/images/I/91D07epNE9L.jpg'
  },
  {
    name: 'textbook',
    image: 'https://bizweb.dktcdn.net/100/477/947/products/tv-1.jpg?v=1685157952070'
  },
  {
    name: 'cooking',
    image: 'https://m.media-amazon.com/images/I/81r0N5Q1ifL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    name: 'comedy',
    image: 'https://cdn-amz.woka.io/images/I/71vmpcJWq7L.jpg'
  },
  {
    name: 'horror',
    image: 'https://content.wepik.com/statics/5394216/preview-page0.jpg'
  },
  {
    name: 'detective',
    image: 'https://beetifulbookcovers.com/wp-content/uploads/2017/10/LondonDetective.jpg'
  },
  {
    name: 'manga',
    image: 'https://cdn-amz.woka.io/images/I/91D07epNE9L.jpg'
  },
  {
    name: 'textbook',
    image: 'https://bizweb.dktcdn.net/100/477/947/products/tv-1.jpg?v=1685157952070'
  },
  {
    name: 'cooking',
    image: 'https://m.media-amazon.com/images/I/81r0N5Q1ifL._AC_UF1000,1000_QL80_.jpg'
  }
]
