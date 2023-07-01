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
          Header: 'AUTHOR',
          accessor: 'author',
          Cell
        },
        {
          Header: 'RELEASE DATE',
          accessor: 'releaseDate',
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
          Header: 'AUTHOR',
          accessor: 'author',
          Cell
        },
        {
          Header: 'RELEASE DATE',
          accessor: 'releaseDate',
          Cell
        },
        {
          Header: '',
          accessor: 'actions'
        }
      ]

  return headers
}
