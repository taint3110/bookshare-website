import { Button, Card, CardBody, CardFooter, CardHeader, Divider, HStack, Heading, Stack, Text } from '@chakra-ui/react'
import { IMockOrder, IMockUser, mockOrder, mockUser } from 'components/BookList/components/BookCard/mockData'
import FormInput from 'components/FormInput'
import CustomDatePicker from 'components/pages/CMS/BookManagement/Book/AddNewBook/components/CustomDatepicker'
import { SyntheticEvent, createElement, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'

const CartUserInfo = () => {
  const user: IMockUser = mockUser
  const order: IMockOrder = mockOrder
  function handleDueDateChange(date: Date | null, event: SyntheticEvent<any, Event> | undefined): void {
    throw new Error('Function not implemented.')
  }

  return (
    <Card flexGrow={1}>
      <CardBody>
        <Heading size="md">
          {user.firstName} {user.lastName}
        </Heading>
        <Text>{user.email}</Text>
        <Text>{user.phoneNumber}</Text>
        <Text as={'b'}>Return date</Text>
        {/* <FormInput name="releaseDate" label="Release Date">
          <Controller
            name="releaseDate"
            // control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={order.dueDate}
                onChange={handleDueDateChange}
                // value={order.dueDate}
                customInput={createElement(forwardRef(CustomDatePicker))}
              />
            )}
          />
        </FormInput> */}
        <Divider flexGrow={1} marginTop={4} marginBottom={4} />
        <HStack justifyContent={'space-between'}>
          <Text as={'b'}>Total:</Text>
          <HStack spacing={4}>
            <Text fontSize="lg" as={'b'} color={'teal.500'}>
              {order.totalPrice}
            </Text>
            <Text fontSize="xs">VND</Text>
          </HStack>
        </HStack>
      </CardBody>
      <CardFooter>
        <Button flexGrow={1}>Place Order</Button>
      </CardFooter>
    </Card>
  )
}

export default CartUserInfo
