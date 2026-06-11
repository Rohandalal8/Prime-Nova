import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import "../styles/navbar.css"; 

function Navbar() {
  const { user, logout } = React.useContext(AuthContext);
  const cartItems = useSelector((state) => state?.cart?.cartItems || state?.cart?.items || []);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
            <img src="/PrimeLogo.png" alt="Prime Basket Logo" className="navbar-logo" />
            Prime Basket
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
        {user ? (
            <>
                <li><Link to="/profile">Hi, {user.name}</Link></li>
                {user.role === "admin" && <li><Link to="/admin">Admin Dashboard</Link></li>}
                <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
            ) : (
            <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;