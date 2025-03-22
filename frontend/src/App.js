import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Books from "./pages/Books";
import BookDetails from "./components/BookDetails";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Books />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
