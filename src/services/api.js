import axios from "axios";


const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const OMDB_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/watchlist`;



export const searchMovies = async (query) => {
  const response = await axios.get(`${OMDB_URL}&s=${query}`);
  return response.data.Search;
};


export const addToWatchlist = async (movie) => {
  const movieToAdd = {
    title: movie.Title,
    year: movie.Year,
    genre: "Unknown",
    status: "Want to Watch",
    review: "",
    poster: movie.Poster,
  };

  return axios.post(BACKEND_URL, movieToAdd);
};

// watchlist
export const getWatchlist = async () => {
  const response = await axios.get(BACKEND_URL);
  return response.data;
};

// movies
export const updateMovie = async (id, updates) => {
  return axios.patch(`${BACKEND_URL}/${id}`, updates);
};

// remove
export const deleteMovie = async (id) => {
  return axios.delete(`${BACKEND_URL}/${id}`);
};
