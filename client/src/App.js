import "./App.css"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Store from './pages/Store';
import Basket from './pages/Basket';
import Product from './pages/Product';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import axios from "axios";
// import Admin from './pages/Admin';

axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('access_token')}`;

function App() {
  const [privilege, setPrivilege] = useState(null);

  const updateNav = () => {
    const token = sessionStorage.getItem('access_token');
    if (token != null) {
      setPrivilege(jwtDecode(token).privilege);
    } else { setPrivilege(null) } 
  }

  return (
    <div className="App">
        <Router>
          <Link to="/" className="link"> Store </Link>
          <Link to="/login" className="link"> Log In / Register </Link>
          <Link to="/basket" className="link"> Basket </Link>
          { privilege == 1 && <Link to="/admin" className="link"> Admin </Link> }
          <Link to="/admin" className="link"> Admin </Link>
          <Routes>
            {/* URL , exact = render only once, store component */}
            <Route path="/" exact element={<Store/>} />
            <Route path="/products/:id" exact element={<Product/>} />
            <Route path="/basket" exact element={<Basket/>} />
            <Route path="/login" exact element={<Login/>} />
            <Route path="/register" exact element={<Register/>} />
            <Route path="/admin" exact element={<Admin/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
