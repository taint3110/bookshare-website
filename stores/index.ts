import CMSBookStore from './cms/cmsBookStore'
import CMSCategoryStore from './cms/cmsCategoryStore'
import CMSOrderStore from './cms/cmsOrderStore'
import CMSSeriesStore from './cms/cmsSeriesStore'
import SpinnerStore from './spinnerStore'
import { WebsiteBookStore } from './website/websiteBookStore'
;``
export class RootStore {
  spinnerStore: SpinnerStore
  cmsBookStore: CMSBookStore
  cmsSeriesStore: CMSSeriesStore
  cmsCategoryStore: CMSCategoryStore
  cmsOrderStore: CMSOrderStore
  websiteBookStore: WebsiteBookStore

  constructor() {
    this.spinnerStore = new SpinnerStore(this)
    this.cmsBookStore = new CMSBookStore(this)
    this.cmsSeriesStore = new CMSSeriesStore(this)
    this.cmsCategoryStore = new CMSCategoryStore(this)
    this.cmsOrderStore = new CMSOrderStore(this)
    this.websiteBookStore = new WebsiteBookStore(this)
  }
}

export const rootStore = new RootStore()
