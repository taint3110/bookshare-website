import { makeAutoObservable } from 'mobx'
import { RootStore } from '.'

class SpinnerStore {
  isLoading?: boolean | undefined = undefined
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  showLoading(): void {
    this.isLoading = true
  }

  hideLoading(): void {
    this.isLoading = false
  }
}
export default SpinnerStore
