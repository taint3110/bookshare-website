import {IMockBook} from 'components/BookList/components/BookCard'

export const mockBooks: IMockBook[] = [
    {
        title: 'Tomie',
        author: ['Junji Ito'],
        price: 100,
        bonusPointPrice: 10,
        bookStatus: 'available',
        bookImages: 'https://m.media-amazon.com/images/I/81TkpoPjOyL._AC_UF1000,1000_QL80_.jpg',
    },
    {
        title: 'My Book',
        author: ['Me Name'],
        price: 100,
        bonusPointPrice: 10,
        bookStatus: 'unavailable',
        bookImages: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
    },
]