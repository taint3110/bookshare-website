import { getCMSOrderDetail, getCMSOrders } from 'API/cms/order'
import { handleError } from 'API/error'
import { IOrder, IOrderWithRelations } from 'interfaces/order'
import { makeAutoObservable } from 'mobx'
import { RootStore } from 'stores'
import { PaginationList } from 'types'
import { IFilter } from 'types/query'

class CMSOrderStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  cmsOrderList: PaginationList<IOrder> = {
    results: [],
    totalCount: 0
  }

  orderDetail: IOrderWithRelations = {} as IOrderWithRelations

  async fetchCMSOrderList(filter: IFilter<IOrder> = {}) {
    try {
      const orderList: PaginationList<IOrder> = await getCMSOrders(filter)
      this.cmsOrderList = orderList
    } catch (error) {
      handleError(error as Error, 'stores/CMSOrderStore.ts', 'fetchCMSOrderList')
    }
  }
  async fetchCMSOrderDetail(id: string, filter: IFilter<IOrder> = {}) {
    try {
      const orderList: IOrderWithRelations = await getCMSOrderDetail(id, filter)
      this.orderDetail = orderList
    } catch (error) {
      handleError(error as Error, 'stores/CMSOrderStore.ts', 'fetchCMSOrderList')
    }
  }
}

export default CMSOrderStore
