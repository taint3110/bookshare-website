import dayjs from 'dayjs'
import router from 'next/router'
import routes from 'routes'

export function goToCategoryAddNewPage(): void {
  router.push(`${routes.cms.bookManagement.category.addNew.value}`)
}
