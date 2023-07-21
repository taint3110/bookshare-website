export interface IMockBook {
  _id: string
  title?: string
  author?: string[]
  price?: number
  bonusPointPrice?: number
  publisher?: string
  language?: string
  bookStatus?: string
  imageUrl?: string
  categories?: IMockCategory[]
  condition: EBookConditionEnum
  cover: EBookCoverEnum
}

export interface IMockUser {
  _id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  bonusPoint: number
}

export interface IMockOrder {
  _id: string
  userId: string
  status: EOrderStatusEnum
  totalPrice: number
  description: string
  dueDate: Date
  bookList: IMockBook[]
}

export enum EBookStatusEnum {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  RENTED = 'rented',
  ORDERED = 'ordered'
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

enum EOrderStatusEnum {
  NEW = 'new',
  ORDERED = 'ordered',
  READY = 'ready',
  DONE = 'done',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
  REFUNDED = 'refunded',
  OVERDUE = 'overdue'
}

export const MockBookConditions = Object.values(EBookConditionEnum)
export const MockBookCovers = Object.values(EBookCoverEnum)

export interface IMockCategory {
  name: string
  image: string
}

export const mockUser: IMockUser = {
  _id: '1',
  email: 'example@gm.com',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '0987654321',
  bonusPoint: 100
}

export const mockBooks: IMockBook[] = [
  {
    _id: '1',
    title: 'Tomie',
    author: ['Junji Ito'],
    price: 100,
    bonusPointPrice: 10,
    publisher: 'NXB Kim Đồng',
    language: 'Tiếng Việt',
    bookStatus: 'available',
    imageUrl: 'https://m.media-amazon.com/images/I/81TkpoPjOyL._AC_UF1000,1000_QL80_.jpg',
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
    _id: '2',
    title: 'My Book',
    author: ['Me Name'],
    price: 80,
    bonusPointPrice: 8,
    publisher: 'NXB Kim Đồng',
    language: 'Tiếng Việt',
    bookStatus: 'unavailable',
    imageUrl: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
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
    _id: '3',
    title: 'The Fall of Iromouth',
    author: ['Thalia Blake'],
    price: 80,
    bonusPointPrice: 8,
    publisher: 'NXB Kim Đồng',
    language: 'Tiếng Việt',
    bookStatus: 'unavailable',
    imageUrl: 'https://i.pinimg.com/originals/a2/0f/ed/a20fedf3c81c1aff08b9eaf779442bd0.jpg',
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
    condition: EBookConditionEnum.DAMAGED,
    cover: EBookCoverEnum.SOFT
  },
  {
    _id: '4',
    title: 'Sisters',
    author: ['Daisy Johnson'],
    price: 80,
    bonusPointPrice: 8,
    publisher: 'NXB Kim Đồng',
    language: 'Tiếng Việt',
    bookStatus: 'available',
    imageUrl: 'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/W2ESGDHDBQI6VAMBMBXGAO5RYQ.jpg',
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
    _id: '5',
    title: 'Tomie',
    author: ['Junji Ito'],
    price: 100,
    bonusPointPrice: 10,
    publisher: 'NXB Kim Đồng',
    language: 'Tiếng Việt',
    bookStatus: 'available',
    imageUrl: 'https://m.media-amazon.com/images/I/81TkpoPjOyL._AC_UF1000,1000_QL80_.jpg',
    categories: [
      {
        name: 'horror',
        image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
      },
      {
        name: 'cooking',
        image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
      }
    ],
    condition: EBookConditionEnum.NEW,
    cover: EBookCoverEnum.HARD
  },
  {
    _id: '6',
    title: 'My Book',
    author: ['Me Name'],
    price: 80,
    bonusPointPrice: 8,
    publisher: 'NXB Kim Đồng',
    language: 'Tiếng Việt',
    bookStatus: 'unavailable',
    imageUrl: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
    categories: [
      {
        name: 'textbook',
        image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
      },
      {
        name: 'cooking',
        image: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
      }
    ],
    condition: EBookConditionEnum.DAMAGED,
    cover: EBookCoverEnum.SOFT
  },
  {
    _id: '7',
    title: 'The Fall of Iromouth',
    author: ['Thalia Blake'],
    price: 80,
    bonusPointPrice: 8,
    publisher: 'NXB Kim Đồng',
    language: 'Tiếng Việt',
    bookStatus: 'unavailable',
    imageUrl: 'https://i.pinimg.com/originals/a2/0f/ed/a20fedf3c81c1aff08b9eaf779442bd0.jpg',
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
    _id: '8',
    title: 'Sisters',
    author: ['Daisy Johnson'],
    price: 80,
    bonusPointPrice: 8,
    publisher: 'NXB Kim Đồng',
    language: 'Tiếng Việt',
    bookStatus: 'available',
    imageUrl: 'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/W2ESGDHDBQI6VAMBMBXGAO5RYQ.jpg',
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
    condition: EBookConditionEnum.OLD,
    cover: EBookCoverEnum.SOFT
  },
  {
    _id: '9',
    title: 'Tomie',
    author: ['Junji Ito'],
    price: 100,
    bonusPointPrice: 10,
    publisher: 'NXB Kim Đồng',
    language: 'Tiếng Việt',
    bookStatus: 'available',
    imageUrl: 'https://m.media-amazon.com/images/I/81TkpoPjOyL._AC_UF1000,1000_QL80_.jpg',
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
    condition: EBookConditionEnum.OLD,
    cover: EBookCoverEnum.HARD
  },
  {
    _id: '10',
    title: 'My Book',
    author: ['Me Name'],
    price: 80,
    bonusPointPrice: 8,
    publisher: 'NXB Kim Đồng',
    language: 'Tiếng Việt',
    bookStatus: 'unavailable',
    imageUrl: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
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
    _id: '11',
    title: 'The Fall of Iromouth',
    author: ['Thalia Blake'],
    price: 80,
    bonusPointPrice: 8,
    publisher: 'NXB Kim Đồng',
    language: 'Tiếng Việt',
    bookStatus: 'unavailable',
    imageUrl: 'https://i.pinimg.com/originals/a2/0f/ed/a20fedf3c81c1aff08b9eaf779442bd0.jpg',
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
    condition: EBookConditionEnum.OLD,
    cover: EBookCoverEnum.SOFT
  },
  {
    _id: '12',
    title: 'Sisters',
    author: ['Daisy Johnson'],
    price: 80,
    bonusPointPrice: 8,
    publisher: 'NXB Kim Đồng',
    language: 'Tiếng Việt',
    bookStatus: 'available',
    imageUrl: 'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/W2ESGDHDBQI6VAMBMBXGAO5RYQ.jpg',
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

// export const mockOrder = null
export const mockOrder: IMockOrder = {
  _id: '1',
  status: EOrderStatusEnum.NEW,
  totalPrice: 10000,
  description: '',
  bookList: [mockBooks[0], mockBooks[2], mockBooks[4]],
  userId: '1',
  dueDate: new Date()
}

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
    name: 'technology',
    image: 'https://dcassetcdn.com/design_img/3662268/71899/71899_21031517_3662268_52ca5b0e_thumbnail.png'
  },
  {
    name: 'cooking',
    image: 'https://m.media-amazon.com/images/I/81r0N5Q1ifL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    name: 'selfhelp',
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcROEPlwnazgd6XynLAsFo0-YW51K-kBFn_c1zYMAjYk46UM7txQ'
  },
  {
    name: 'religous',
    image: 'https://www.creativeparamita.com/wp-content/uploads/2020/05/The-Power-of-Prayer-1.jpg'
  },
  {
    name: 'philosophy',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTlZSVkAOnrYDl-5vsASEGRVgTZwejWaUxeQ&usqp=CAU'
  },
  {
    name: 'fitness',
    image: 'https://m.media-amazon.com/images/I/51BnS3spI8L.jpg'
  }
]
