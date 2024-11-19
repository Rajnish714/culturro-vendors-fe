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
import AddProductButton from "./components/AddProductButton";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import Home from "./pages/Home";
import {useAuthStore} from "./store/useAuthStore";

const App: React.FC = () => {
  const {token, initializeToken} = useAuthStore();

  useEffect(() => {
    initializeToken(); // Initialize token from local storage
  }, [initializeToken]);

  const isAuthenticated = () => !!token;

  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/" replace /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <>
                <AddProductButton />
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

// import React, {useEffect} from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import NavBar from "./components/NavBar";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import AddProductButton from "./components/AddProductButton";
// import AddProductPage from "./pages/AddProductPage";
// import EditProductPage from "./pages/EditProductPage";
// import Home from "./pages/Home";
// import {useAuthStore} from "./store/useAuthStore";

// const App: React.FC = () => {
//   const {token, initializeToken, vendor} = useAuthStore();

//   useEffect(() => {
//     initializeToken(); // Initialize token from local storage
//   }, [token, initializeToken]);
//   console.log(vendor);
//   return (
//     <Router>
//       <NavBar />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <AddProductButton />
//               <Home />
//             </>
//           }
//         />
//         <Route
//           path="/login"
//           element={token ? <Navigate to="/" replace /> : <Login />}
//         />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="/add-Product"
//           element={
//             token ? <AddProductPage /> : <Navigate to="/login" replace />
//           }
//         />
//         <Route
//           path="/edit-product/:productId"
//           element={
//             token ? <EditProductPage /> : <Navigate to="/login" replace />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
