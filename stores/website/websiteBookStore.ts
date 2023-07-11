import { handleError } from 'API/error'
import { getWebsiteBookDetail } from 'API/website/book'
import { IBookWithRelations } from 'interfaces/book'
import { makeAutoObservable } from 'mobx'
import { RootStore } from 'stores'

export class WebsiteBookStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  bookDetail: IBookWithRelations = {} as IBookWithRelations

  async fetchWebsiteBookDetail(id: string) {
    try {
      const bookDetail: IBookWithRelations = await getWebsiteBookDetail(id)
      this.bookDetail = bookDetail
    } catch (error) {
      handleError(error as Error, 'stores/WebsiteBookStore.ts', 'fetchWebsiteBookList')
    }
  }
}
