import { getTopMovies } from "../helpers/tmdbAPI";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_DATA } from "../CONSTANT";
import swal from "sweetalert";
import Pagination from "../components/pagination";

export default function Home() {
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState([]);
  const [myPendingOrders, setMyPendingOrders] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getMyOrders();
    setMovieDatas(currentPage);
  }, [localStorage.access_token,currentPage]);

  async function setMovieDatas(currentPage) {
    let dataTop = await getTopMovies(currentPage);
    dataTop.forEach((el) => {
      if (el.vote_average > 8.5) {
        el.price = 10000;
      } else {
        el.price = 5000;
      }
    });
    setTopMovies(dataTop);
  }

  async function getMyOrders() {
    try {
      if (localStorage.access_token) {
        let { data } = await axios({
          method: "get",
          url: URL_DATA + "/my-profile",
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        let pendingOrder = data?.filter((el) => {
          if (el.paymentStatus === "pending") {
            return el;
          }
        });
        let movieId = pendingOrder?.map((el) => {
          return Number(el.movie_id);
        });
        setMyPendingOrders(movieId);

        data = data?.filter((el) => {
          if (el.paymentStatus === "success") {
            return el;
          }
        });
        movieId = data?.map((el) => {
          return Number(el.movie_id);
        });
        console.log(movieId);
        setMyOrders(movieId);
      } else {
        setMyOrders([]);
        setMyPendingOrders([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function changePageToDetail(id) {
    navigate(`/movie/${id}`);
  }

  async function handlePlaceOrder(movie) {
    try {
      if (localStorage.access_token) {
        if (myPendingOrders.includes(movie.id)) {
          swal(
            "Buy Failed!",
            "You already order this movie, pay now.",
            "error"
          );
          navigate("/my-profile");
        } else {
          let { data } = await axios({
            method: "post",
            url: URL_DATA + `/midtrans/token`,
            data: {
              price: movie.price,
              title: movie.title,
              movie_id: movie.id,
              imgUrl: movie.poster_path,
              description: movie.overview,
              duration: 0,
            },
            headers: { authorization: `Bearer ${localStorage.access_token}` },
          });
          window.snap.pay(data.token, {
            onSuccess: function () {
              swal(
                "Payment Success",
                "Success, You can watch it now",
                "success"
              );
              navigate("/my-profile");
            },
            onPending: function () {
              console.log("pending");
            },
            onError: function () {
              swal("Payment Failed", "", "error");
              navigate("/");
            },
            onClose: function () {
              navigate("/");
            },
          });
        }
      } else {
        swal("Buy Failed!", "Please login first to buy a movie", "error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handlePage(value) {
    setCurrentPage((page) => {
      return page + value;
    });
  }

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Pagination currentPage={currentPage} handlePage={handlePage} />
      </div>
      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {topMovies &&
            topMovies.map((movie) => {
              return (
                <Card
                  key={movie.id}
                  movie={movie}
                  myOrders={myOrders}
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
