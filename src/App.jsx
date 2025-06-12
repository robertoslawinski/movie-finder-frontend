import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import WatchlistPage from "./pages/WatchlistPage";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  console.log("Loaded");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
    </>
  );
}

export default App;
