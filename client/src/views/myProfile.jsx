import Navbar from "../components/navbar";
import TableMyProfile from "../components/tableMyProfile";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_DATA } from "../CONSTANT";

export default function MyProfile() {
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    getMyOrders();
  }, []);

  async function getMyOrders() {
    try {
      let { data } = await axios({
        method: "get",
        url: URL_DATA + "/my-profile",
        headers: { authorization: `Bearer ${localStorage.access_token}` },
      });
      setMyOrders(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <h1>My Transaction</h1>
        <table className="table text-light">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Order Time</th>
              <th>Net Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order, index) => {
              return (
                <tr key={order.id}>
                  <TableMyProfile
                    index={index}
                    data={order}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
