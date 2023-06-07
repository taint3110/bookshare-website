import CMSBookStore from './cms/cmsBookStore'
import SpinnerStore from './spinnerStore'
export class RootStore {
  spinnerStore: SpinnerStore
  cmsBookStore: CMSBookStore

  constructor() {
    this.spinnerStore = new SpinnerStore(this)
    this.cmsBookStore = new CMSBookStore(this)
  }
}

export const rootStore = new RootStore()
