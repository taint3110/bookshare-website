import { VStack, HStack, Text, Avatar, Box } from '@chakra-ui/react'
import { useStores } from 'hooks/useStores'
import { observer } from 'mobx-react-lite'
import { useMediaQuery } from 'react-responsive'
import { maxTabletWidth } from 'theme/globalStyles'
import getSubComponent from 'components/HOCs/getSubComponent'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { ITenant } from 'interfaces/listing'
import { getValidArray } from 'utils/common'
import { getTenantHeaderList, subHeaderList } from '../../constants'
import { ITenantListTable } from './type'

const TenantListTable = (props: ITenantListTable) => {
  const { tenants, setOpen } = props
  const { unitStore } = useStores()
  const isNotDesktop: boolean = useMediaQuery({ maxWidth: maxTabletWidth })
  const dataInTable = getValidArray<ITenant>(tenants).map((tenant) => {
    function handleEdit(): void {
      setOpen(true)
      unitStore.setCurrentTenant(tenant)
    }
    return {
      ...tenant,
      imageUrl: <Avatar size="sm" name={tenant?.firstName} src={tenant?.imageUrl ?? ''} />,
      fullName: `${tenant.firstName ?? ''} ${tenant.lastName ?? ''}`,
      actions: (
        <HStack width="62px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={handleEdit} />
        </HStack>
      )
    }
  })
  return (
    <VStack spacing={4} width="full">
      <Text lineHeight="24px" fontSize="16" fontWeight="600" color="gray.700" alignSelf="flex-start">
        Tenant List
      </Text>
      <Box width="stretch" border="1px" borderColor="gray.200" borderRadius="12px">
        <Table
          headerList={getTenantHeaderList(isNotDesktop)}
          tableData={dataInTable}
          isSmallSize
          subComponent={getSubComponent(subHeaderList, 1)}
        />
      </Box>
    </VStack>
  )
}

export default observer(TenantListTable)
