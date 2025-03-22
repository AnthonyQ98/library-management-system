import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeBook, setActiveBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get("http://localhost:8000/api/books/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  };

  const createBook = () => setModal(true);

  const editBook = (book) => {
    setActiveBook(book);
    setModal(true);
  };

  const deleteBook = (id) => {
    axios.delete(`http://localhost:8000/api/books/${id}/`)
      .then(fetchBooks)
      .catch((err) => console.error("Error deleting book:", err));
  };

  // This function will handle saving a book (either create or update)
  const saveBook = (bookData) => {
    if (activeBook) {
      // Update book
      axios.put(`http://localhost:8000/api/books/${activeBook.id}/`, bookData)
        .then(() => {
          fetchBooks();
          setModal(false);  // Close the modal after saving
        })
        .catch((err) => console.error("Error updating book:", err));
    } else {
      // Create new book
      axios.post("http://localhost:8000/api/books/", bookData)
        .then(() => {
          fetchBooks();
          setModal(false);  // Close the modal after saving
        })
        .catch((err) => console.error("Error creating book:", err));
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4">Library Management</h1>

      <button className="btn btn-primary mb-4" onClick={createBook}>
        Add New Book
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th> <th>Description</th> <th>Author</th> <th>Available</th> <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length ? books.map((book) => (
            <tr key={book.id}>
              <td><Link to={`/book/${book.id}`}>{book.title}</Link></td>
              <td>{book.description}</td>
              <td>{book.rentee || "N/A"}</td>
              <td>{book.available ? "Yes" : "No"}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => editBook(book)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="5">No books available.</td></tr>}
        </tbody>
      </table>

      {modal && <Modal book={activeBook} onSave={saveBook} onClose={() => setModal(false)} />}
    </div>
  );
};

export default Books;
