import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies, addToWatchlist } from "../services/api";
import "../pages/SearchResults.css";

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    if (query) {
      searchMovies(query)
        .then((data) => {
          if (data && data.length > 0) {
            setResults(data);
            setError("");
          } else {
            setResults([]);
            setError("🧙‍♂️ No movies found. Try another spell!");
          }
        })
        .catch(() => {
          setError("❌ Failed to fetch movies. Check your connection with the Ministry of Magic.");
        });
    }
  }, [query]);

  return (
    <div className="results-container">
      {error && <p className="error-message">{error}</p>}
      {results.map((movie) => (
        <div className="movie-card" key={movie.imdbID}>
          <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
          <div className="movie-title">{movie.Title}</div>
          <div className="movie-year">{movie.Year}</div>
          <button className="action-button" onClick={() => addToWatchlist(movie)}>
            ✨ Add to Watchlist
          </button>
        </div>
      ))}
    </div>
  );
}
