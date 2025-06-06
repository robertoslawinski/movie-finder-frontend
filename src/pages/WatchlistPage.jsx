import { useEffect, useState } from "react";
import { getWatchlist, deleteMovie, updateMovie } from "../services/api";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para edição
  const [editingId, setEditingId] = useState(null);
  const [editReview, setEditReview] = useState("");
  const [editStatus, setEditStatus] = useState("Want to Watch");

  // Buscar a lista atualizada
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

  useEffect(() => {
    fetchWatchlist();
  }, []);

  // Deletar um filme
  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      setWatchlist((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // Submeter edição
  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await updateMovie(id, {
        status: editStatus,
        review: editReview,
      });
      setEditingId(null);
      fetchWatchlist();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

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

              <button onClick={() => handleDelete(movie.id)}>❌ Remove</button>

              <button
                onClick={() => {
                  setEditingId(movie.id);
                  setEditReview(movie.review);
                  setEditStatus(movie.status);
                }}
              >
                ✏️ Edit
              </button>

              {editingId === movie.id && (
                <form
                  onSubmit={(e) => handleEditSubmit(e, movie.id)}
                  style={{ marginTop: "10px" }}
                >
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <option value="Want to Watch">Want to Watch</option>
                    <option value="Watched">Watched</option>
                  </select>
                  <br />
                  <textarea
                    placeholder="Write your review..."
                    value={editReview}
                    onChange={(e) => setEditReview(e.target.value)}
                  />
                  <br />
                  <button type="submit">💾 Save</button>
                  <button type="button" onClick={() => setEditingId(null)}>
                    ❌ Cancel
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No movies in your watchlist yet.</p>
      )}
    </div>
  );
}
