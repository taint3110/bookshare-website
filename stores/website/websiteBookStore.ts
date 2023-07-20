import { handleError } from 'API/error'
import { getWebsiteBookDetail, getWebsiteBooks } from 'API/website/book'
import { IBook, IBookWithRelations } from 'interfaces/book'
import { makeAutoObservable } from 'mobx'
import { RootStore } from 'stores'
import { PaginationList } from 'types'
import { IFilter } from 'types/query'

export class WebsiteBookStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  websiteBookList: PaginationList<IBookWithRelations> = {
    results: [],
    totalCount: 0
  }
  bookDetail: IBookWithRelations = {} as IBookWithRelations

  titleFilter: string = ''

  async fetchWebsiteBookDetail(id: string) {
    try {
      const bookDetail: IBookWithRelations = await getWebsiteBookDetail(id)
      this.bookDetail = bookDetail
    } catch (error) {
      handleError(error as Error, 'stores/WebsiteBookStore.ts', 'fetchWebsiteBookList')
    }
  }

  async fetchWebsiteBookList(filter: IFilter<IBookWithRelations> = {}) {
    try {
      const bookList: PaginationList<IBookWithRelations> = await getWebsiteBooks(filter)
      this.websiteBookList = bookList
    } catch (error) {
      handleError(error as Error, 'stores/CMSBookStore.ts', 'fetchWebsiteBookList')
    }
  }

  setTitleFilter(title: string): void {
    this.titleFilter = title
  }
}
