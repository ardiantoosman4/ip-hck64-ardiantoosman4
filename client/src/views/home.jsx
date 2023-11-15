import React from "react";
import { getPopularMovies, getTopMovies } from "../helpers/tmdbAPI";
import { useState } from "react";
import { useEffect } from "react";
import { TMDB_IMG } from "../CONSTANT";
import Navbar from "../components/navbar";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  useEffect(() => {
    setMovieDatas();
  }, []);

  async function setMovieDatas() {
    let dataPopular = await getPopularMovies();
    let dataTop = await getTopMovies();
    setPopularMovies(dataPopular);
    setTopMovies(dataTop);
  }

  console.log(topMovies);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="text-white">Home</div>
      </div>
    </>
  );
}
