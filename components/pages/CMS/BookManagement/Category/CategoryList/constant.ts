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
          Header: 'NAME',
          accessor: 'name',
          Cell
        },
        {
          Header: 'DESCRIPTION',
          accessor: 'description',
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
          Header: 'NAME',
          accessor: 'name',
          Cell
        },
        {
          Header: 'DESCRIPTION',
          accessor: 'description',
          Cell
        },
        {
          Header: '',
          accessor: 'actions'
        }
      ]

  return headers
}
