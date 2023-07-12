import { ITableHeader } from 'components/Table'
import Cell from 'components/Table/components/ExpandableCell'

export function getHeaderList(): ITableHeader[] {
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
      Header: 'AUTHOR',
      accessor: 'author',
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
      Header: '',
      accessor: 'actions'
    }
  ]
  return headers
}
