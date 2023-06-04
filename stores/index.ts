import SpinnerStore from './spinnerStore'
export class RootStore {
  spinnerStore: SpinnerStore

  constructor() {
    this.spinnerStore = new SpinnerStore(this)
  }
}

export const rootStore = new RootStore()
