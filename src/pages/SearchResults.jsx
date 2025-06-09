// src/pages/SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies, addToWatchlist } from "../services/api";
import "./SearchResults.css";

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    if (query) {
      searchMovies(query).then((data) => {
        if (data) {
          setResults(data);
        } else {
          setResults([]);
        }
      });
    }
  }, [query]);

  const handleAdd = (movie) => {
    addToWatchlist(movie).then(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    });
  };

  return (
    <div className="results-container">
      {showNotification && (
        <div className="notification">Movie added to your watchlist!</div>
      )}
      {results.map((movie) => (
        <div className="movie-card" key={movie.imdbID}>
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="movie-poster"
          />
          <div className="movie-title">{movie.Title}</div>
          <div className="movie-year">{movie.Year}</div>
          <button className="action-button" onClick={() => handleAdd(movie)}>
            ✨ Add to Watchlist
          </button>
        </div>
      ))}
    </div>
  );
}
