import { EOrderStatusEnum } from 'enums/order'
import { IBookWithRelations } from 'interfaces/book'
import { IOption } from 'interfaces/common'
import { IMedia } from 'interfaces/media'

//*INFO: Unit is room in house
export interface IOrder {
  _id?: string
  id?: string
  orderStatus?: EOrderStatusEnum
  description?: string
  totalPrice?: number
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
  bookList?: IBookWithRelations[]
  userId?: string
  rentLength?: number
  formStatus?: IOption
  formUserName?: string
  formRentLength?: IOption
  dueDate?: Date
  totalBonusPointPrice?: number
}

export interface IOrderWithRelations extends IOrder {}
