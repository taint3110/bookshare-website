import { Divider, HStack, StackProps, Text } from '@chakra-ui/react'

const DividerWithText = (props: StackProps) => (
  <HStack marginY="8" {...props}>
    <Divider borderColor="gray.500" />
    <Text paddingX="3" fontSize="md" fontWeight="400" color="gray.500">
      {props.children}
    </Text>
    <Divider borderColor="gray.500" />
  </HStack>
)

export default DividerWithText
