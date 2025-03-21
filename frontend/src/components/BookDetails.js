import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";  // Import the useParams hook

const BookDetails = () => {
    const { id } = useParams();  // Use the useParams hook to get the route params
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetchBookDetails(id);
    }, [id]);  // Re-run the effect if the id changes

    const fetchBookDetails = (id) => {
        axios
            .get(`http://localhost:8000/api/books/${id}/`)
            .then((response) => {
                setBook(response.data);
            })
            .catch((error) => {
                console.error("Error fetching book details:", error.response);
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
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Rentee:</strong> {book.rentee}</p>
                <p><strong>Available:</strong> {book.available ? "Yes" : "No"}</p>
            </div>
        </div>
    );
};

export default BookDetails;
