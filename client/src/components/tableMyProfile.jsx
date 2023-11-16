import React from "react";
import rupiah from "../helpers/currencyRupiah";
import Status from "./status";
import ActionButton from "./actionMyProfile";

export default function TableMyProfile({ index, data }) {
  return (
    <>
      <td>{index + 1}</td>
      <td>{data.title}</td>
      <td>{new Date(data.updatedAt).toLocaleString()}</td>
      <td>{rupiah(data.price)}</td>
      <td>
        <Status type={data.paymentStatus} />
      </td>
      <td>
        <ActionButton type={data.paymentStatus} orderId={data.id} />
      </td>
    </>
  );
}
