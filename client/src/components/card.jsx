import { TMDB_IMG } from "../CONSTANT";
export default function Card({
  movie,
  myOrders,
  changePageToDetail,
  handlePlaceOrder,
}) {
  let content = movie.overview;
  if (content.length > 100) {
    content = content.slice(0, 100);
    content += " ...";
  }
  if (!myOrders) {
    myOrders = [];
  }
  return (
    <>
      <div className="col text-ligth">
        <div className="card h-100">
          <img
            src={TMDB_IMG + movie.poster_path}
            className="card-img-top"
            style={{ width: "100%", height: "10vw", objectFit: "cover" }}
          />
          <div className="card-body bg-dark">
            <h4 className="card-title">
              <b>{movie.title}</b>
            </h4>
            <p className="card-text fs-6 fw-lighter">{content}</p>
          </div>
          <div className="card-footer bg-dark">
            <div className="d-flex justify-content-end">
              <a
                className="btn btn-secondary btn-sm me-2"
                onClick={() => changePageToDetail(movie.id)}
              >
                See More
              </a>
              {myOrders.includes(movie.id) ? (
                <a
                  className="btn btn-success btn-sm"
                  onClick={() => changePageToDetail(movie.id)}
                >
                  Watch Now
                </a>
              ) : (
                <a
                  className="btn btn-danger btn-sm"
                  onClick={() => handlePlaceOrder(movie)}
                >
                  Buy Access
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
