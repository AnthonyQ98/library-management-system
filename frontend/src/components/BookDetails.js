import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        fetchBookDetails(id);
        fetchUserId();
    }, [id]);

    const getAuthAxios = () => {
        const token = localStorage.getItem("token");
        return axios.create({
            baseURL: "http://localhost:8000/api/",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };

    const fetchBookDetails = (id) => {
        setError(null);
        getAuthAxios()
            .get(`books/${id}/`)
            .then((response) => {
                setBook(response.data);
            })
            .catch((error) => {
                console.error("Error fetching book details:", error.response);
                setError("Error loading book details. Please try again later.");
            });
    };

    const fetchUserId = () => {
        getAuthAxios()
            .get("users/me/") // Assuming an endpoint to get logged-in user info
            .then((response) => {
                setUserId(response.data.id);
            })
            .catch((error) => {
                console.error("Error fetching user ID:", error.response);
            });
    };

    const rentBook = () => {
        if (!book) return;
        setError(null);
        getAuthAxios()
            .post(`books/${book.id}/rent/`)
            .then(() => {
                setBook((prevBook) => ({ ...prevBook, available: false, rentee: userId }));
            })
            .catch((error) => {
                console.error("Error renting book:", error.response);
                setError("Error renting book. Please try again later.");
            });
    };

    const returnBook = () => {
        if (!book) return;
        setError(null);
        getAuthAxios()
            .put(`books/${book.id}/return/`)
            .then(() => {
                setBook((prevBook) => ({ ...prevBook, available: true, rentee: null }));
            })
            .catch((error) => {
                console.error("Error returning book:", error.response);
                setError("Error returning book. Please try again later.");
            });
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h4>{book.title}</h4>
            </div>
            <div className="card-body">
                {error && <p className="text-danger">{error}</p>}
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Rentee:</strong> {book.rentee || "None"}</p>
                <p><strong>Available:</strong> {book.available ? "Yes" : "No"}</p>
                {book.available ? (
                    <button className="btn btn-primary" onClick={rentBook}>
                        RENT
                    </button>
                ) : (
                    book.rentee === userId && (
                        <button className="btn btn-warning" onClick={returnBook}>
                            RETURN
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default BookDetails;
