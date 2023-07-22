import { ITableHeader } from 'components/Table'
import Cell from 'components/Table/components/ExpandableCell'
import { EAlignEnum } from 'enums/common'

export function getHeaderList(hasDeleteButton: boolean = true): ITableHeader[] {
  const headers: ITableHeader[] = [
    {
      Header: 'COVER',
      accessor: 'image',
      disableSortBy: true
    },
    {
      Header: 'TITLE',
      accessor: 'title',
      disableSortBy: true,
      Cell
    },
    {
      Header: 'PRICE',
      accessor: 'price',
      disableSortBy: true,
      Cell
    },
    {
      Header: 'POINT',
      accessor: 'bonusPointPrice',
      disableSortBy: true,
      align: EAlignEnum.RIGHT,
      Cell
    }
  ]
  if (hasDeleteButton) {
    return [
      ...headers,
      {
        Header: '',
        accessor: 'actions'
      }
    ]
  }
  return headers
}
