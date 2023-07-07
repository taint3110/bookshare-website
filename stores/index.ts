import CMSBookStore from './cms/cmsBookStore'
import CMSCategoryStore from './cms/cmsCategoryStore'
import CMSOrderStore from './cms/cmsOrderStore'
import CMSSeriesStore from './cms/cmsSeriesStore'
import SpinnerStore from './spinnerStore'
;``
export class RootStore {
  spinnerStore: SpinnerStore
  cmsBookStore: CMSBookStore
  cmsSeriesStore: CMSSeriesStore
  cmsCategoryStore: CMSCategoryStore
  cmsOrderStore: CMSOrderStore

  constructor() {
    this.spinnerStore = new SpinnerStore(this)
    this.cmsBookStore = new CMSBookStore(this)
    this.cmsSeriesStore = new CMSSeriesStore(this)
    this.cmsCategoryStore = new CMSCategoryStore(this)
    this.cmsOrderStore = new CMSOrderStore(this)
  }
}

export const rootStore = new RootStore()
