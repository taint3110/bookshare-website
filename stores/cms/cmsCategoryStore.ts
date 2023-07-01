import { getCMSCategory, getCMSCategoryDetail } from 'API/cms/category'
import { handleError } from 'API/error'
import { ICategory } from 'interfaces/category'
import { makeAutoObservable } from 'mobx'
import { RootStore } from 'stores'
import { PaginationList } from 'types'
import { IFilter } from 'types/query'
import { checkValidArray } from 'utils/common'

class CMSCategoryStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  cmsCategoryList: PaginationList<ICategory> = {
    results: [],
    totalCount: 0
  }
  cmsCategory: ICategory = {}

  async fetchCMSCategoryList(filter: IFilter<ICategory> = {}) {
    try {
      const categoryList: ICategory[] = await getCMSCategory(filter)
      if (checkValidArray(categoryList))
        this.cmsCategoryList = {
          results: categoryList,
          totalCount: categoryList.length
        }
    } catch (error) {
      handleError(error as Error, 'stores/CMSCategory.ts', 'fetchCMSCategoryList')
    }
  }

  async fetchCMSCategory(id: string, filter: IFilter<ICategory> = {}) {
    try {
      const category: ICategory = await getCMSCategoryDetail(id, filter)
      this.cmsCategory = category
    } catch (error) {
      handleError(error as Error, 'stores/CMSCategory.ts', 'fetchCMSCategoryList')
    }
  }
}

export default CMSCategoryStore
