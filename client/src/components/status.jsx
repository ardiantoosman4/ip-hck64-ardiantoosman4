import React from "react";

export default function Status({ type }) {
  return (
    <>
      {type === "pending" ? (
        <span className="status text-danger">• pending</span>
      ) : (
        <span className="status text-success">• success</span>
      )}
    </>
  );
}
