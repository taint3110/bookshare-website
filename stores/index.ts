import CMSBookStore from './cms/cmsBookStore'
import SpinnerStore from './spinnerStore'
import CMSSeriesStore from './cms/cmsSeriesStore';
export class RootStore {
  spinnerStore: SpinnerStore
  cmsBookStore: CMSBookStore
  cmsSeriesStore: CMSSeriesStore

  constructor() {
    this.spinnerStore = new SpinnerStore(this)
    this.cmsBookStore = new CMSBookStore(this)
    this.cmsSeriesStore = new CMSSeriesStore(this)
  }
}

export const rootStore = new RootStore()
