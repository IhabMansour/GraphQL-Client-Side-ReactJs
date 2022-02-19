import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
    const [books, setBooks] = useState({});
    const [selectedId, setSelectedId] = useState(null);
    const { loading, error, data } = useQuery(getBooksQuery);

    useEffect(() => {
        setBooks(data?.books);
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <ul id='book-list'>
                {books?.length > 0 && books?.map((book) => (
                    <li key={book.id} onClick={() => setSelectedId(book.id)}>
                        {book.name}
                    </li>
                ))}
            </ul>
            <BookDetails bookId={selectedId} />
        </div>
    )
}

export default BookList;
