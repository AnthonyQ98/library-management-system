import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await axios.post("http://localhost:8000/api/register/", { 
                username, 
                password, 
                email 
            });
            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (error) {
            setError("Registration failed. Please try again.");
            console.error("Error registering:", error.response);
        }
    };

    return (
        <form onSubmit={handleRegister} className="register-form">
            {error && <p className="text-danger">{error}</p>}
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;