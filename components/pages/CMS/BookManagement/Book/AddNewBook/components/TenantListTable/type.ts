import { ITenant } from 'interfaces/listing'

export interface ITenantListTable {
  tenants: ITenant[]
  setOpen: (isModalOpen: boolean) => void
}
