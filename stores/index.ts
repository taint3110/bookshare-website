import AuthStore from './authStore'
import CMSBookStore from './cms/cmsBookStore'
import CMSCategoryStore from './cms/cmsCategoryStore'
import CMSOrderStore from './cms/cmsOrderStore'
import CMSSeriesStore from './cms/cmsSeriesStore'
import SpinnerStore from './spinnerStore'
import { WebsiteBookStore } from './website/websiteBookStore'
import { WebsiteOrderStore } from './website/websiteOrderStore'
;``
export class RootStore {
  spinnerStore: SpinnerStore
  authStore: AuthStore
  cmsBookStore: CMSBookStore
  cmsSeriesStore: CMSSeriesStore
  cmsCategoryStore: CMSCategoryStore
  cmsOrderStore: CMSOrderStore
  websiteBookStore: WebsiteBookStore
  websiteOrderStore: WebsiteOrderStore

  constructor() {
    this.spinnerStore = new SpinnerStore(this)
    this.authStore = new AuthStore(this)
    this.cmsBookStore = new CMSBookStore(this)
    this.cmsSeriesStore = new CMSSeriesStore(this)
    this.cmsCategoryStore = new CMSCategoryStore(this)
    this.cmsOrderStore = new CMSOrderStore(this)
    this.websiteBookStore = new WebsiteBookStore(this)
    this.websiteOrderStore = new WebsiteOrderStore(this)
  }
}

export const rootStore = new RootStore()
