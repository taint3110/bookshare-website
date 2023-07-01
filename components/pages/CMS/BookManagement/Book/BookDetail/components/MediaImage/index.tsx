import { Button, FormControl, FormErrorMessage, FormLabel, Img, Input, VStack } from '@chakra-ui/react'
import { get } from 'lodash'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { UploaderIcon } from 'theme/icon'

export interface IMediaImageProps {
  media?: string
  formLabel?: string
  currentFile?: string
  setCurrentFile: (file: string) => void
}
const MediaImage = (props: IMediaImageProps) => {
  const { media, currentFile, setCurrentFile, formLabel } = props
  const {
    formState: { errors },
    register
  } = useFormContext()

  const [isEditing, setIsEditing] = useState<boolean>(false)
  function handleClickUpload(): void {
    setIsEditing(!isEditing)
    if (media) {
      setCurrentFile(media)
      isEditing && toast.success('Upload image successfully')
      setIsEditing(!isEditing)
    }
  }

  return (
    <FormControl width="full" isInvalid={!!get(errors, 'formMedia', false)}>
      <FormLabel
        color="gray.700"
        lineHeight={6}
        marginBottom={4}
        marginInlineEnd={0}
        maxWidth={{ base: '224px', lg: '238px' }}
        whiteSpace="nowrap"
      >
        {formLabel}
      </FormLabel>
      <VStack width="full" spacing={4} alignItems="flex-start">
        {currentFile && media && (
          <VStack
            width="full"
            spacing={4}
            alignItems="flex-start"
            border="1px solid #E2E8F0"
            borderRadius="6px"
            box-sizing="border-box"
            height="full"
            maxWidth="374px"
          >
            <Img
              border="2px solid transparent"
              borderRadius="6px"
              display="block"
              src={currentFile}
              alt="default-image"
              objectFit="cover"
              width="full"
              height="full"
            />
          </VStack>
        )}
        {isEditing && <Input type="text" {...register('formMedia')} />}
        <Button
          flexDirection="row"
          iconSpacing={2}
          leftIcon={<UploaderIcon />}
          variant="outline"
          onClick={handleClickUpload}
        >
          Upload image
        </Button>
      </VStack>
      <FormErrorMessage>{String(get(errors, `formMedia.message`, ''))}</FormErrorMessage>
    </FormControl>
  )
}

export default MediaImage
