
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddProductButton from './components/AddProductButton';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import Home from './pages/Home'

//import SearchAndPagination from './components/SearchAndPagination';
//import About from './pages/About';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            {/* <SearchAndPagination /> */}
            
            <AddProductButton />
            <Home />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-Product" element={<AddProductPage />} />
        <Route path="/edit-product/:productId" element={<EditProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;
