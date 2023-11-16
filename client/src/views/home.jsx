import { getTopMovies } from "../helpers/tmdbAPI";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_DATA } from "../CONSTANT";

export default function Home() {
  const navigate = useNavigate();
  const [topMovies, setTopMovies] = useState([]);
  useEffect(() => {
    setMovieDatas();
  }, []);

  async function setMovieDatas() {
    let dataTop = await getTopMovies();
    dataTop.forEach((el) => {
      if (el.vote_average > 8.5) {
        el.price = 10000;
      } else {
        el.price = 5000;
      }
    });
    setTopMovies(dataTop);
  }

  function changePageToDetail(id) {
    navigate(`/movie/${id}`);
  }

  async function handlePlaceOrder(movie) {
    try {
      let { data } = await axios({
        method: "post",
        url: URL_DATA + `/midtrans/token`,
        data: {
          price: movie.price,
          title: movie.title,
          imgUrl: movie.poster_path,
          description: movie.overview,
          duration: 0,
        },
        headers: { authorization: `Bearer ${localStorage.access_token}` },
      });
      window.snap.pay(data.token);
    } catch (error) {
      console.log(error);
    }
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
                  handlePlaceOrder={handlePlaceOrder}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
