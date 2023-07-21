import { getWebsiteOrderList, orderBook } from 'API/customer/order'
import { handleError } from 'API/error'
import { EOrderStatusEnum } from 'enums/order'
import { IBookWithRelations } from 'interfaces/book'
import { IOrder } from 'interfaces/order'
import omit from 'lodash/omit'
import { makeAutoObservable } from 'mobx'
import { RootStore } from 'stores'
import { PaginationList } from 'types'
import { IFilter } from 'types/query'
import { getValidArray } from 'utils/common'

export class WebsiteOrderStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  websiteOrderList: PaginationList<IOrder> = {
    results: [],
    totalCount: 0
  }

  currentOrder: IOrder = {} as IOrder

  async updateOrder(order: IOrder, filter: IFilter<IOrder> = {}): Promise<void> {
    try {
      this.currentOrder = order
      await orderBook(
        {
          ...omit(order, 'formRentLength'),
          bookList: getValidArray(order?.bookList).map((book: IBookWithRelations) => ({
            ...omit(book, 'categories', 'series', 'media')
          }))
        },
        filter
      )
    } catch (error) {
      handleError(error as Error, 'stores/WebsiteOrderStore.ts', 'updateOrder')
    }
  }

  async fetchWebsiteOrderList(filter: IFilter<IOrder> = {}): Promise<void> {
    try {
      const orderList: PaginationList<IOrder> = await getWebsiteOrderList(filter)
      const websiteOrderListResult: IOrder[] = getValidArray(orderList?.results).map((order: IOrder) => {
        if (order.orderStatus === EOrderStatusEnum.NEW) {
          this.currentOrder = order
        }
        return {
          ...order,
          formRentLength: {
            label: `${order?.rentLength} ${order?.rentLength ?? 1 > 1 ? 'months' : 'month'}`,
            value: String(order?.rentLength) ?? ''
          }
        }
      })
      this.websiteOrderList = {
        results: websiteOrderListResult,
        totalCount: orderList?.totalCount
      }
    } catch (error) {
      handleError(error as Error, 'stores/CMSOrderStore.ts', 'fetchWebsiteOrderList')
    }
  }
}
