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
          Header: 'AUTHOR',
          accessor: 'author',
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
        Header: 'AUTHOR',
        accessor: 'author',
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

export const DEFAULT_UNIT_IMAGE_URL: string = '/assets/images/metro_default_image.png'
