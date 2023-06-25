import CMSLayout from 'components/Layout/CMSLayout'
import AddNewCategory from 'components/pages/CMS/BookManagement/Category/AddNewCategory'

const CategoryAddNewPage = () => {
  return (
    <CMSLayout title={`Book Management | Internal Portal`} topBarTitle="Book Management">
      <AddNewCategory />
    </CMSLayout>
  )
}

export default CategoryAddNewPage
