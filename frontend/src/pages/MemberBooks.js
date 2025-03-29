import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MemberBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const getAuthAxios = () => {
    const token = localStorage.getItem("token");
    return axios.create({
      baseURL: "http://localhost:8000/api/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    setError(null);
    const authAxios = getAuthAxios();
    authAxios
      .get("books/")
      .then((res) => setBooks(res.data))
      .catch((err) => {
        console.error("Error fetching books:", err);
        setError("Error loading books. Please try again later.");
      });
  };

  const availableBooks = books.filter((book) => book.available);
  const unavailableBooks = books.filter((book) => !book.available);

  return (
    <div>
      <h1 className="text-center mb-4">Library Books</h1>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center">Available Books</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Author</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              {availableBooks.length ? (
                availableBooks.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <Link to={`/book/${book.id}`}>{book.title}</Link>
                    </td>
                    <td>{book.description}</td>
                    <td>{book.author || "N/A"}</td>
                    <td>{book.genre || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No available books.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="col-md-6">
          <h2 className="text-center">Unavailable Books</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Author</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              {unavailableBooks.length ? (
                unavailableBooks.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <Link to={`/book/${book.id}`}>{book.title}</Link>
                    </td>
                    <td>{book.description}</td>
                    <td>{book.author || "Unknown"}</td>
                    <td>{book.genre || "Unknown"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No unavailable books.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberBooks;
