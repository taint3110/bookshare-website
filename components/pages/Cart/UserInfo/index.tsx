import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Stack,
  Text
} from '@chakra-ui/react'
import { IMockOrder, IMockUser, mockOrder, mockUser } from 'components/BookList/components/BookCard/mockData'
import FormInput from 'components/FormInput'
import { SyntheticEvent, createElement, forwardRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'
import CustomDatePicker from './components/CustomeDatePicker'

const CartUserInfo = () => {
  const methods = useForm({
    mode: 'onChange'
  })
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isSubmitSuccessful },
    control,
    reset,
    setValue
  } = methods
  const user: IMockUser = mockUser
  const order: IMockOrder = mockOrder
  const [selectedDate, setSelectedDate] = useState<Date>(order.dueDate)
  function handleDueDateChange(date: Date | null, event: SyntheticEvent<any, Event> | undefined): void {
    order.dueDate = date ?? order.dueDate
    setSelectedDate(order.dueDate)
  }

  return (
    <Card flex={1}>
      <CardBody>
        <Heading size="md">
          {user.firstName} {user.lastName}
        </Heading>
        <Text>{user.email}</Text>
        <Text>{user.phoneNumber}</Text>
        <Text marginTop={8} as={'b'}>
          Return date
        </Text>
        <Controller
          name="releaseDate"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={selectedDate}
              onChange={handleDueDateChange}
              customInput={createElement(forwardRef(CustomDatePicker))}
            />
          )}
        />
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
        <Button colorScheme="teal" variant="solid" flexGrow={1}>
          Place Order
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CartUserInfo
