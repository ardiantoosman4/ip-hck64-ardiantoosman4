import React from "react";

export default function ActionButton({ type }) {
  return (
    <>
      {type !== "pending" ? (
        <a className="btn btn-success btn-sm" style={{ width: "100px" }}>
          Watch Now
        </a>
      ) : (
        <>
          <a className="btn btn-success btn-sm" style={{ width: "100px" }}>
            Pay Movie
          </a>
          <a className="btn btn-danger btn-sm ms-2" style={{ width: "100px" }}>
            Cancel
          </a>
        </>
      )}
    </>
  );
}
