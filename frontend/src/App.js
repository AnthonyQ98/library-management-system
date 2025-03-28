import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import {PrivateRoute, ProtectedRoute} from "./components/PrivateRoute";
import Login from "./pages/Login";
import AdminBooks from "./pages/AdminBooks";
import BookDetails from "./components/BookDetails";
import MemberBooks from "./pages/MemberBooks";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/manage" element={<AdminBooks />} />
            </Route>
            <Route path="/" element={<MemberBooks />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
