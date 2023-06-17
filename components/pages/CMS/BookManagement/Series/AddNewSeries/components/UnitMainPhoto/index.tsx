import { Dispatch, SetStateAction } from 'react'
import {
  FormControl,
  FormLabel,
  VStack,
  Button,
  Image,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { IMedia } from 'interfaces/media'
import { getValidArray } from 'utils/common'
import PhotoGrid from '../../../../HouseManagement/HouseDetail/components/HouseMainPhoto/components/PhotoGrid'

export interface IHouseMainPhotoProps {
  media: IMedia[]
  selectedPhoto?: IMedia
  setSelectedPhoto: Dispatch<SetStateAction<IMedia | undefined>>
}

const UnitMainPhoto = (props: IHouseMainPhotoProps) => {
  const { media = [], selectedPhoto, setSelectedPhoto } = props
  const mainPhoto: string = (selectedPhoto?.url ?? '') || (media[0]?.url ?? '')
  const hasNoMedia: boolean = getValidArray(media).length === 0
  const { isOpen, onOpen, onClose } = useDisclosure()
  const previousPhoto: IMedia =
    getValidArray(media).find((mediaItem: IMedia) => mediaItem?.url === mainPhoto) ?? media[0]

  function selectPhoto(photo: IMedia): void {
    setSelectedPhoto(photo)
  }

  function cancelSelectPhoto(): void {
    onClose()
    setSelectedPhoto(previousPhoto)
  }

  return (
    <FormControl>
      <FormLabel color="gray.700" lineHeight={6} marginBottom={4} marginInlineEnd={0} marginTop={1}>
        Room Main photo
      </FormLabel>
      <VStack spacing={4} alignItems="flex-start">
        {!hasNoMedia ? (
          <Image
            src={mainPhoto}
            alt="main-photo"
            hidden={hasNoMedia}
            maxHeight={{ base: '170px', lg: '190px' }}
            borderRadius={6}
          />
        ) : (
          <Text hidden={!hasNoMedia} color="gray.500" fontSize="md" fontWeight={500}>
            This room does not have photo gallery
          </Text>
        )}
        <Button onClick={onOpen} disabled={hasNoMedia} variant="outline">
          Choose Another Photo
        </Button>
      </VStack>
      <Modal isOpen={isOpen} onClose={cancelSelectPhoto} scrollBehavior="inside" size="2xl">
        <ModalOverlay />
        <ModalContent maxWidth="fit-content">
          <ModalHeader fontSize="lg" color="gray.800" fontWeight={500}>
            Select Room Main Photo
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody border="1px solid #E2E8F0" padding={6} className="hasScrollBar">
            <VStack spacing={6} alignItems="flex-start">
              <Text>Choose the best photo for this room. You can change later.</Text>
              <PhotoGrid
                media={media}
                selectedPhoto={selectedPhoto}
                selectPhoto={selectPhoto}
                onClose={cancelSelectPhoto}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              color="gray.700"
              lineHeight={6}
              border="1px solid #E2E8F0"
              border-radius="6px"
              background="white"
              marginRight={4}
              paddingY={2}
              onClick={cancelSelectPhoto}
            >
              Cancel
            </Button>
            <Button border-radius="6px" lineHeight={6} colorScheme="teal" paddingY={2} onClick={cancelSelectPhoto}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormControl>
  )
}

export default UnitMainPhoto
