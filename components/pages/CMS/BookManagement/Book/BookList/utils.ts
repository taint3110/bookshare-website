import dayjs from 'dayjs'
import router from 'next/router'
import routes from 'routes'

export function getAvailableDates(
  availableStartDate?: Date,
  availableEndDate?: Date,
  defaultAvailableStartDate?: Date,
  defaultAvailableEndDate?: Date
): string {
  const availableDates: string =
    availableStartDate && availableEndDate
      ? `${dayjs(availableStartDate).format('YYYY/MM/DD')} - ${dayjs(availableEndDate).format('YYYY/MM/DD')}`
      : `${dayjs(defaultAvailableStartDate).format('YYYY/MM/DD')} - ${dayjs(defaultAvailableEndDate).format(
          'YYYY/MM/DD'
        )}`
  return availableDates
}

export function goToBookAddNewPage(): void {
  router.push(`${routes.cms.bookManagement.book.addNew.value}`)
}
