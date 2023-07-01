import { getCMSSeries, getCMSSeriesDetail } from 'API/cms/series'
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
  cmsSeriesDetail: ISeries = {}

  async fetchCMSSeriesList(filter: IFilter<ISeries> = {}) {
    try {
      const seriesList: PaginationList<ISeries> = await getCMSSeries(filter)
      this.cmsSeriesList = seriesList
    } catch (error) {
      handleError(error as Error, 'stores/CMSSeriesStore.ts', 'fetchCMSSeriesList')
    }
  }

  async fetchCMSSeriesDetail(id: string, filter?: IFilter<ISeries>) {
    try {
      const seriesDetail: ISeries = await getCMSSeriesDetail(id, filter)
      this.cmsSeriesDetail = seriesDetail
    } catch (error) {
      handleError(error as Error, 'stores/CMSSeriesStore.ts', 'fetchCMSSeries')
    }
  }
}

export default CMSSeriesStore
