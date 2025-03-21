import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import Modal from "./components/Modal";
import BookDetails from "./components/BookDetails";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            modal: false,
            activeBook: null,
        };
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks = () => {
        axios
            .get("http://localhost:8000/api/books/")
            .then((response) => {
                console.log("Fetched books:", response.data);
                this.setState({ books: response.data });
            })
            .catch((error) => {
                console.error("Error fetching books:", error.response);
            });
    };

    createBook = () => {
        this.setState({ activeBook: null, modal: true });
    };

    editBook = (book) => {
        this.setState({ activeBook: book, modal: true });
    };

    deleteBook = (id) => {
        axios
            .delete(`http://localhost:8000/api/books/${id}/`)
            .then(() => {
                this.fetchBooks();
            })
            .catch((error) => {
                console.error("Error deleting book:", error.response);
            });
    };

    saveBook = (bookData) => {
        if (this.state.activeBook) {
            // If editing, send PUT request
            axios
                .put(`http://localhost:8000/api/books/${this.state.activeBook.id}/`, bookData)
                .then(() => {
                    this.fetchBooks();
                    this.closeModal();
                })
                .catch((error) => {
                    console.error("Error updating book:", error.response);
                });
        } else {
            // If creating new, send POST request
            axios
                .post("http://localhost:8000/api/books/", bookData)
                .then(() => {
                    this.fetchBooks();
                    this.closeModal();
                })
                .catch((error) => {
                    console.error("Error creating book:", error.response);
                });
        }
    };

    closeModal = () => {
        this.setState({ modal: false });
    };

    renderBookList = () => {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: '200px', textAlign: 'center' }}>Title</th>
                            <th style={{ width: '300px', textAlign: 'center' }}>Description</th>
                            <th style={{ width: '200px', textAlign: 'center' }}>Author</th>
                            <th style={{ width: '150px', textAlign: 'center' }}>Available</th>
                            <th style={{ width: '200px', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.books.length > 0 ? (
                            this.state.books.map((book) => (
                                <tr key={book.id}>
                                    <td style={{ width: '200px', wordWrap: 'break-word', textAlign: 'center' }}>
                                        <Link to={`/book/${book.id}`} className="text-decoration-none">
                                            {book.title}
                                        </Link>
                                    </td>
                                    <td style={{ width: '300px', wordWrap: 'break-word', textAlign: 'center' }}>
                                        {book.description}
                                    </td>
                                    <td style={{ width: '200px', textAlign: 'center' }}>
                                        {book.rentee || "N/A"}
                                    </td>
                                    <td style={{ width: '150px', textAlign: 'center' }}>
                                        {book.available ? "Yes" : "No"}
                                    </td>
                                    <td style={{ width: '200px', textAlign: 'center' }}>
                                        <button
                                            className="btn btn-secondary mr-2"
                                            onClick={() => this.editBook(book)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => this.deleteBook(book.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No books available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    render() {
        return (
            <Router>
                <div className="container">
                    {/* Centered Book Library Link with larger text */}
                    <h1 className="text-center mb-4">
                        <Link to="/" className="text-decoration-none text-dark" style={{ fontSize: '2.5rem' }}>
                            Library Management System
                        </Link>
                    </h1>

                    {/* Create Book Button */}
                    <button className="btn btn-primary mb-4" onClick={this.createBook}>
                        Add New Book
                    </button>

                    <Routes>
                        {/* Route to display the list of books */}
                        <Route path="/" element={this.renderBookList()} />

                        {/* Route to display a single book */}
                        <Route path="/book/:id" element={<BookDetails />} />
                    </Routes>

                    {this.state.modal && (
                        <Modal
                            book={this.state.activeBook}
                            onSave={this.saveBook}
                            onClose={this.closeModal}
                        />
                    )}
                </div>
            </Router>
        );
    }
}

export default App;
