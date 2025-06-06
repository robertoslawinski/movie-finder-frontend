import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

export default function SearchResults() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const results = await searchMovies(searchQuery);
        if (results) {
          setMovies(results);
        } else {
          setMovies([]);
        }
      } catch (err) {
        setError("Something went wrong while fetching movies.");
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Results for: "{searchQuery}"</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          !loading && <p>No results found.</p>
        )}
      </div>
    </div>
  );
}
