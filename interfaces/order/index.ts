import { EOrderStatusEnum } from 'enums/order'
import { IBookWithRelations } from 'interfaces/book'
import { IMedia } from 'interfaces/media'

//*INFO: Unit is room in house
export interface IOrder {
  _id?: string
  id?: string
  orderStatus?: EOrderStatusEnum
  description?: string
  totalPrice?: IMedia
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
  bookList?: IBookWithRelations[]
  userId?: string
  rentLength?: number
}

export interface IOrderWithRelations extends IOrder {}
