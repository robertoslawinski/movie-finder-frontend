import { useEffect, useState } from "react";
import { getWatchlist } from "../services/api";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getWatchlist();
        setWatchlist(data);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div>
      <h1>🎬 My Watchlist</h1>
      {loading ? (
        <p>Loading...</p>
      ) : watchlist.length > 0 ? (
        <div className="movies-grid">
          {watchlist.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.poster} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <p>Status: {movie.status}</p>
              <p>Review: {movie.review || "No review yet."}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies in your watchlist yet.</p>
      )}
    </div>
  );
}
