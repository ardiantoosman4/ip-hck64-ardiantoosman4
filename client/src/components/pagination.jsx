export default function Pagination({ currentPage, handlePage }) {
  let textPage = `Page : ${currentPage}`;

  return (
    <section>
      <div>
        <ul className="pagination">
          <li className="page-item">
            <a
              onClick={(e) => {
                e.preventDefault();
                handlePage(-1);
              }}
              className={
                currentPage == 1 ? "btn page-link disabled bg-dark text-light" : "btn page-link bg-dark text-light"
              }
              href="#"
              aria-label="Previous"
            >
              <span aria-hidden="true">«</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item">
            <span
              className="btn btn-dark disabled"
              style={{ cursor: "context-menu" }}
            >
              {textPage}
            </span>
          </li>
          <li className="page-item">
            <a
              onClick={(e) => {
                e.preventDefault();
                handlePage(1);
              }}
              className="btn page-link bg-dark text-light"
              href="#"
              aria-label="Next"
            >
              <span aria-hidden="true">»</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
