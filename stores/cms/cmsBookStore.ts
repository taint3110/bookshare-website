import { getCMSBooks } from 'API/cms/book'
import { handleError } from 'API/error'
import { IBook } from 'interfaces/book'
import { makeAutoObservable } from 'mobx'
import { RootStore } from 'stores'
import { PaginationList } from 'types'
import { IFilter } from 'types/query'

class CMSBookStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  cmsBookList: PaginationList<IBook> = {
    results: [],
    totalCount: 0
  }

  async fetchCMSBookList(filter: IFilter<IBook> = {}) {
    try {
      const bookList: PaginationList<IBook> = await getCMSBooks(filter)
      this.cmsBookList = bookList
    } catch (error) {
      handleError(error as Error, 'stores/CMSBookStore.ts', 'fetchCMSBookList')
    }
  }
}

export default CMSBookStore
