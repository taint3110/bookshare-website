import { ITableHeader } from 'components/Table'
import Cell from 'components/Table/components/ExpandableCell'

export function getHeaderList(isMobileTablet: boolean): ITableHeader[] {
  const headers: ITableHeader[] = isMobileTablet
    ? [
        {
          Header: '',
          accessor: 'isExpand',
          Cell
        },
        {
          Header: 'USER',
          accessor: 'fullName',
          disableSortBy: true
        },
        {
          Header: 'TOTAL PRICE',
          accessor: 'totalPrice',
          Cell
        },
        {
          Header: 'RENT LENGTH',
          accessor: 'rentLength',
          Cell
        },
        {
          Header: 'STATUS',
          accessor: 'orderStatus',
          Cell
        },
        {
          Header: 'CREATED AT',
          accessor: 'createdAt',
          Cell
        },
        {
          Header: 'UPDATED',
          accessor: 'updatedAt',
          Cell
        },
        {
          Header: '',
          accessor: 'actions'
        }
      ]
    : [
        {
          Header: 'USER',
          accessor: 'fullName',
          disableSortBy: true
        },
        {
          Header: 'TOTAL PRICE',
          accessor: 'totalPrice',
          Cell
        },
        {
          Header: 'Rent Length',
          accessor: 'rentLength',
          Cell
        },
        {
          Header: 'STATUS',
          accessor: 'orderStatus',
          Cell
        },
        {
          Header: '',
          accessor: 'actions'
        }
      ]

  return headers
}
