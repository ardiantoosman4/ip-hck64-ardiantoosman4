import axios from "axios";
import React from "react";
import { URL_DATA } from "../CONSTANT";

export default function ActionButton({ type, orderId }) {
  async function handlePay(id) {
    try {
      let { data } = await axios({
        method: "get",
        url: URL_DATA + `/my-profile/order/${id}`,
        headers: { authorization: `Bearer ${localStorage.access_token}` },
      });
      window.snap.pay(data.snapToken);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {type !== "pending" ? (
        <button className="btn btn-success btn-sm" style={{ width: "100px" }}>
          Watch Now
        </button>
      ) : (
        <>
          <button
            onClick={() => handlePay(orderId)}
            className="btn btn-success btn-sm"
            style={{ width: "100px" }}
          >
            Pay Movie
          </button>
          <button
            className="btn btn-danger btn-sm ms-2"
            style={{ width: "100px" }}
          >
            Cancel
          </button>
        </>
      )}
    </>
  );
}
