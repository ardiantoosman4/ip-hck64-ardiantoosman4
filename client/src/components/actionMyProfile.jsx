import axios from "axios";
import React from "react";
import { URL_DATA } from "../CONSTANT";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function ActionButton({ type, orderId }) {
  const navigate = useNavigate();
  async function handlePay(id) {
    try {
      let { data } = await axios({
        method: "get",
        url: URL_DATA + `/my-profile/order/${id}`,
        headers: { authorization: `Bearer ${localStorage.access_token}` },
      });
      window.snap.pay(data.snapToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  async function handleCancelPay(id) {
    try {
      let { data } = await axios({
        method: "delete",
        url: URL_DATA + `/my-profile/order/${id}`,
        headers: { authorization: `Bearer ${localStorage.access_token}` },
      });
      swal("Cancel Payment", "Success to cancel order movie", "success");
      navigate("/");
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
            onClick={() => handleCancelPay(orderId)}
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
