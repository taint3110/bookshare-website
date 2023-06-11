import { ChangeEvent, useRef, useState, useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  HStack,
  Text,
  Avatar,
  Input,
  ModalOverlay,
  Box
} from '@chakra-ui/react'
import { useStores } from 'hooks/useStores'
import lodashSet from 'lodash/set'
import { observer } from 'mobx-react-lite'
import FormInput from 'components/FormInput'
import Icon from 'components/Icon'
import { IEditTenantFormModalProps } from './types'

const EditTenantFormModal = (props: IEditTenantFormModalProps) => {
  const { isOpen, onClose, onClickAccept, selectedImage, selectImage, setFormValue } = props
  const { unitStore } = useStores()
  const { currentTenant } = unitStore
  const avatarRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string>('')
  let oldPreview: string = ''

  function handleChooseAvatar(): void {
    avatarRef.current?.click()
  }

  function handleCancelEditTenant(): void {
    URL.revokeObjectURL(preview)
    lodashSet(avatarRef, 'current.value', '')
    selectImage(null)
    setPreview(oldPreview)
    //* INFO: Reset tenant's information
    currentTenant?.job && setFormValue('job', currentTenant.job)
    currentTenant?.hobbies && setFormValue('hobbies', currentTenant.hobbies)
    onClose()
  }

  function handleChangeAvatar(event: ChangeEvent<HTMLInputElement>): void {
    if (!!event?.target?.files?.[0]) {
      !!event?.target?.files?.[0] && selectImage(event?.target?.files?.[0])
    }
  }

  useEffect(() => {
    oldPreview = preview
    if (!selectedImage) {
      setPreview('')
      return
    }
    const objectUrl = URL.createObjectURL(selectedImage)
    setPreview(objectUrl)
    //* INFO: disable unnecessary eslint rule eslint-disable-next-line consistent-return
    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedImage])

  useEffect(() => {
    //* INFO: Fill out current tenant's information
    setFormValue('job', currentTenant?.job)
    setFormValue('hobbies', currentTenant?.hobbies)
  }, [currentTenant])

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Tenant</ModalHeader>
        <ModalCloseButton size="md" />
        <ModalBody
          padding={6}
          minWidth="100%"
          overflow="auto"
          borderTop={'1px solid #E2E8F0'}
          borderBottom={'1px solid #E2E8F0'}
        >
          <VStack width="full" spacing={6}>
            <Text fontWeight="bold">{`${currentTenant?.firstName} ${currentTenant?.lastName}`}</Text>
            <VStack
              dir="row"
              spacing={2}
              align="center"
              width="full"
              justifyContent={{ base: 'center', md: 'flex-start' }}
            >
              <Text cursor="default">Profile Image</Text>
              <HStack position="relative">
                <Avatar
                  size="xl"
                  name={currentTenant?.firstName}
                  src={preview || currentTenant?.imageUrl}
                  onClick={handleChooseAvatar}
                />
                <HStack
                  minWidth="max-content"
                  justifyContent="flex-end"
                  onClick={handleChooseAvatar}
                  cursor="pointer"
                  alignItems="baseline"
                >
                  <Box
                    borderWidth="1px"
                    borderRadius="50%"
                    borderColor="#E2E8F0"
                    padding={0}
                    backgroundColor="white"
                    position="absolute"
                    height={10}
                    width={10}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bottom={0}
                    boxShadow="sm"
                    right={1}
                  >
                    <Icon iconName="edit.svg" size={32} />
                  </Box>
                </HStack>
              </HStack>
              <Input type="file" ref={avatarRef} accept={'image/*'} onChange={handleChangeAvatar} display="none" />
            </VStack>
            <FormInput name="job" label="Job" placeholder="Enter Tenant’s Job" isRequired={false} />
            <FormInput
              name="hobbies"
              label="Hobbies"
              placeholder="e.g. Listen to music, Cooking..."
              isRequired={false}
            />
          </VStack>
        </ModalBody>
        <ModalFooter hidden={false} justifyContent="right">
          <HStack>
            <Button
              colorScheme="teal"
              variant="outline"
              size="md"
              iconSpacing={2}
              color="gray.700"
              onClick={handleCancelEditTenant}
            >
              Cancel
            </Button>
            <Button colorScheme="teal" size="md" variant="solid" iconSpacing={2} onClick={onClickAccept}>
              Save
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default observer(EditTenantFormModal)
