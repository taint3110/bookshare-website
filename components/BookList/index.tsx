import { Container, HStack, Stack } from "@chakra-ui/react";
import { getValidArray } from 'utils/common'
import BookCard, { IMockBook } from "./components/BookCard";
import { mockBooks } from "./components/BookCard/mockData";

const BookList = ({ books }: { books: IMockBook[] }) => {
    return <HStack  spacing={12}>
        {books.map((book: IMockBook, indexBook: number) => (
            <BookCard {...book} key={indexBook} />
        ))}
    </HStack>
}

export default BookList;