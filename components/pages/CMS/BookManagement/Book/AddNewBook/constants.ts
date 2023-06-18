import { ITableHeader } from 'components/Table'
import Cell from 'components/Table/components/ExpandableCell'
import { IBook } from 'interfaces/book'
import { IOption } from 'interfaces/common'

export function getTenantHeaderList(isMobileTablet: boolean): ITableHeader[] {
  const headers: ITableHeader[] = isMobileTablet
    ? [
        {
          Header: '',
          accessor: 'isExpand',
          disableSortBy: true,
          Cell
        },
        {
          Header: 'Image',
          accessor: 'imageUrl',
          disableSortBy: true
        },
        {
          Header: 'ID',
          accessor: 'id'
        },
        {
          Header: 'FIRST NAME',
          accessor: 'firstName'
        },
        {
          Header: 'LAST NAME',
          accessor: 'lastName'
        },
        {
          Header: '',
          accessor: 'actions'
        }
      ]
    : [
        {
          Header: 'Image',
          accessor: 'imageUrl',
          disableSortBy: true
        },
        {
          Header: 'ID',
          accessor: 'id'
        },
        {
          Header: 'NAME',
          accessor: 'fullName'
        },
        {
          Header: 'EMAIL',
          accessor: 'email'
        },
        {
          Header: 'JOB',
          accessor: 'job'
        },
        {
          Header: 'HOBBIES',
          accessor: 'hobbies'
        },
        {
          Header: '',
          accessor: 'actions'
        }
      ]

  return headers
}

export const subHeaderList: ITableHeader[] = [
  {
    Header: '',
    accessor: 'isExpand',
    disableSortBy: true,
    Cell
  },
  {
    Header: 'EMAIL ADDRESS',
    accessor: 'email',
    Cell
  },
  {
    Header: 'JOB',
    accessor: 'job',
    Cell
  },
  {
    Header: 'HOBBIES',
    accessor: 'hobbies',
    Cell
  },
  {
    Header: '',
    accessor: 'actions'
  }
]