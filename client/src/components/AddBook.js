import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

const AddBook = () => {
    const [authors, setAuthors] = useState({});
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    const { loading, data } = useQuery(getAuthorsQuery);

    const [getDog] = useMutation(addBookMutation, {
        refetchQueries: [{ query: getBooksQuery }],
    });

    const handleSubmitFrom = (e) => {
        e.preventDefault();
        getDog({
            variables: {
                name: name,
                genre: genre,
                authorId: authorId
            }
        })
    }

    useEffect(() => {
        setAuthors(data?.authors)
    }, [data]);

    return (
        <form id="add-book" onSubmit={(e) => handleSubmitFrom(e)}>
            <div className="field">
                <label>Book Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)} />
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setAuthorId(e.target.value)}>
                    {loading ?
                        <option disabled>Loading Authors...</option> :
                        <>
                            <option>Select author</option>
                            {authors?.length > 0 && authors?.map((author) => (
                                <option key={author.id} value={author.id}>{author.name}</option>
                            ))}
                        </>
                    }
                </select>
            </div>

            <button>+</button>
        </form>
    )
}

export default AddBook;
