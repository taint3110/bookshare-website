import { getValidArray } from 'utils/common';
import { getCMSSeries } from 'API/cms/series'
import { handleError } from 'API/error'
import { ISeries } from 'interfaces/series'
import { makeAutoObservable } from 'mobx'
import { RootStore } from 'stores'
import { PaginationList } from 'types'
import { IFilter } from 'types/query'

class CMSSeriesStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  cmsSeriesList: PaginationList<ISeries> = {
    results: [],
    totalCount: 0
  }

  async fetchCMSSeriesList(filter: IFilter<ISeries> = {}) {
    try {
      const seriesList: ISeries[] = await getCMSSeries(filter)
      this.cmsSeriesList.results = getValidArray(seriesList)
      this.cmsSeriesList.totalCount = getValidArray(seriesList).length
    } catch (error) {
      handleError(error as Error, 'stores/CMSSeriesStore.ts', 'fetchCMSSeriesList')
    }
  }
}

export default CMSSeriesStore
