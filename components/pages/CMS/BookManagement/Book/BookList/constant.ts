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
          Header: 'COVER',
          accessor: 'image',
          disableSortBy: true
        },
        {
          Header: 'TITLE',
          accessor: 'title',
          Cell
        },
        {
          Header: 'CATEGORIES',
          accessor: 'categories',
          Cell
        },
        {
          Header: 'SERIES',
          accessor: 'series',
          Cell
        },
        {
          Header: 'PRICE',
          accessor: 'price',
          Cell
        },
        {
          Header: 'STATUS',
          accessor: 'status',
          Cell
        },
        {
          Header: '',
          accessor: 'actions'
        }
      ]
    : [
        {
          Header: 'COVER',
          accessor: 'image',
          disableSortBy: true
        },
        {
          Header: 'TITLE',
          accessor: 'title',
          Cell
        },
        {
          Header: 'CATEGORIES',
          accessor: 'categories',
          Cell
        },
        {
          Header: 'SERIES',
          accessor: 'series',
          Cell
        },
        {
          Header: 'PRICE',
          accessor: 'price',
          Cell
        },
        {
          Header: 'STATUS',
          accessor: 'status',
          Cell
        },
        {
          Header: '',
          accessor: 'actions'
        }
      ]

  return headers
}