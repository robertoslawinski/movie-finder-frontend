import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hatLogo from "../assets/logo2.png";
import "../pages/Home.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/results?search=${search}`);
    }
  };

  return (
    <div className="home-container">
      <img src={hatLogo} alt="Sorting Hat" className="home-logo" />
      <h1 className="home-title">Welcome to MuggleFlix</h1>
      <p className="home-subtitle">
        Accio movies! Summon your favorite films like a true wizard 
      </p>
      <form onSubmit={handleSubmit} className="home-form">
        <input
          type="text"
          placeholder="Search magical movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">🔍 Search</button>
      </form>
    </div>
  );
}
