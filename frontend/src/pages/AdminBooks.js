import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeBook, setActiveBook] = useState(null);
  const [error, setError] = useState(null);

  const getAuthAxios = () => {
    const token = localStorage.getItem("token");
    return axios.create({
      baseURL: "http://localhost:8000/api/",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    setError(null); // Clear any previous errors
    const authAxios = getAuthAxios();
    authAxios.get("manage/")
      .then((res) => setBooks(res.data))
      .catch((err) => {
        console.error("Error fetching books:", err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          setError("Permission denied: You don't have access to view books.");
          }
       else {
          setError("Error loading books. Please try again later.");
        }
      });
  };

  const createBook = () => {
    setError(null);
    setModal(true);
  };

  const editBook = (book) => {
    setError(null);
    setActiveBook(book);
    setModal(true);
  };

  const deleteBook = (id) => {
    setError(null);
    const authAxios = getAuthAxios();
    authAxios.delete(`manage/${id}/`)
      .then(fetchBooks)
      .catch((err) => {
        console.error("Error deleting book:", err);
        if (err.response && err.response.status === 403) {
          setError("Permission denied: You don't have permission to delete books.");
        } else {
          setError("Error deleting book. Please try again later.");
        }
      });
  };

  // This function will handle saving a book (either create or update)
  const saveBook = (bookData) => {
    setError(null);
    const authAxios = getAuthAxios();
    
    if (activeBook) {
      // Update book
      authAxios.put(`manage/${activeBook.id}/`, bookData)
        .then(() => {
          fetchBooks();
          setModal(false);  // Close the modal after saving
        })
        .catch((err) => {
          console.error("Error updating book:", err);
          if (err.response && err.response.status === 403) {
            setError("Permission denied: You don't have permission to update books.");
          } else {
            setError("Error updating book. Please try again later.");
          }
        });
    } else {
      // Create new book
      authAxios.post("manage/", bookData)
        .then(() => {
          fetchBooks();
          setModal(false);  // Close the modal after saving
        })
        .catch((err) => {
          console.error("Error creating book:", err);
          if (err.response && err.response.status === 403) {
            setError("Permission denied: You don't have permission to create books.");
          } else {
            setError("Error creating book. Please try again later.");
          }
        });
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4">Library Management Admin Control Panel</h1>

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

      {modal && <Modal book={activeBook} onSave={saveBook} onClose={() => setModal(false)} error={error} />}
    </div>
  );
};

export default AdminBooks;
