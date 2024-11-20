import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import Home from "./pages/Home";
import {useAuthStore} from "./store/useAuthStore";

const App: React.FC = () => {
  const {token, initializeToken} = useAuthStore();

  useEffect(() => {
    initializeToken();
  }, [initializeToken]);

  const isAuthenticated = () => !!token;

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/" replace /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <>
                <Home />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/add-product"
          element={
            isAuthenticated() ? (
              <AddProductPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/edit-product/:productId"
          element={
            isAuthenticated() ? (
              <EditProductPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
