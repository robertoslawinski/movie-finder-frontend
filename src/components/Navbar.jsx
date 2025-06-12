// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import logo from "../assets/logo-hat.png";  

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="title">MuggleFlix</h1>
      <div style={{ marginLeft: "2rem" }}>
        <NavLink to="/" style={{ marginRight: "1rem" }}>Home</NavLink>
        <NavLink to="/watchlist">Watchlist</NavLink>
      </div>
    </nav>
  );
}
