import axios from "axios";
import { TMDB_DATA } from "../CONSTANT";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getPopularMovies = async () => {
  const movie = await axios.get(`${TMDB_DATA}/movie/popular?api_key=${apiKey}`);
  return movie.data.results;
};

export const getTopMovies = async (page) => {
  const movie = await axios.get(
    `${TMDB_DATA}/movie/top_rated?api_key=${apiKey}&page=${page}`
  );
  return movie.data.results;
};
