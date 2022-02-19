import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
    const [book, setBook] = useState({});
    const [handleClicked, { loading, error, data }] = useLazyQuery(getBookQuery, {
        variables: {
            id: bookId
        }
    });

    useEffect(() => {
        handleClicked()
    }, [bookId]);

    useEffect(() => {
        setBook(data?.book);
    }, [data])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div id="book-details">
            {book && Object.keys(book)?.length > 0 ?
                <>
                    <p>Output book details here:-</p>
                    <div>
                        <h2>{book?.name}</h2>
                        <p>{book?.genre}</p>
                        <p>{book?.author?.name}</p>
                        {book?.author?.books.length > 0 &&
                            <>
                                <p>All books by this author:</p>
                                <ul className="other-books">
                                    {book?.author?.books?.map((book) => (
                                        <li key={book.id}>{book.name}</li>
                                    ))}
                                </ul>
                            </>
                        }
                    </div>
                </> :
                <div>No book selected...</div>
            }
        </div>
    )
}

export default BookDetails;
