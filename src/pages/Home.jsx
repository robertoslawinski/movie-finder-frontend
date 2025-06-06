// src/pages/Home.jsx
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🪄 Welcome to MuggleFlix</h1>
      <p>Search for magical movies and build your enchanted watchlist.</p>
      <SearchBar />
    </div>
  );
}
