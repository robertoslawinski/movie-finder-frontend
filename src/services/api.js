import axios from "axios";

// Substitua com a sua chave válida da OMDb
const API_KEY = "2d8a27db";
const OMDB_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
const BACKEND_URL = "http://localhost:5005/watchlist";

// Buscar filmes da OMDb API
export const searchMovies = async (query) => {
  const response = await axios.get(`${OMDB_URL}&s=${query}`);
  return response.data.Search;
};

// Adicionar um filme à watchlist
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

// Obter toda a watchlist
export const getWatchlist = async () => {
  const response = await axios.get(BACKEND_URL);
  return response.data;
};

// Atualizar um filme
export const updateMovie = async (id, updates) => {
  return axios.patch(`${BACKEND_URL}/${id}`, updates);
};

// Remover um filme da watchlist
export const deleteMovie = async (id) => {
  return axios.delete(`${BACKEND_URL}/${id}`);
};
