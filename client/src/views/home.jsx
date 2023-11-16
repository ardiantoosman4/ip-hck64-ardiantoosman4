import { getPopularMovies, getTopMovies } from "../helpers/tmdbAPI";
import { useState,useEffect } from "react";
import Navbar from "../components/navbar";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
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

  function changePageToDetail(id){
    navigate(`/movie/${id}`)
  }

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {topMovies &&
            topMovies.map((movie) => {
              return (
                <Card
                  key={movie.id}
                  movie={movie}
                  changePageToDetail={changePageToDetail}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
