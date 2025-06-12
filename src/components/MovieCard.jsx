import { addToWatchlist } from "../services/api";

export default function MovieCard({ movie }) {
  const handleAdd = async () => {
    try {
      await addToWatchlist(movie);
      alert(`🎬 "${movie.Title}" added to your watchlist!`);
    } catch (error) {
      console.error(error);
      alert("❌ Error adding movie to watchlist");
    }
  };

  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <button onClick={handleAdd}>➕ Add to Watchlist</button>
    </div>
  );
}
