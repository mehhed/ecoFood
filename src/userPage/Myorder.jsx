import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authentication/Authentication";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";

const Myorder = () => {
  const [totalOrder, setOrder] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userEmail = currentUser?.email;
  useEffect(() => {
    fetch(`https://ecofood.vercel.app/order/${userEmail}`)
      .then((res) => res.json())
      .then((orderData) => setOrder(orderData));
    AOS.init();
  }, [userEmail]);
  console.log(totalOrder);

  //   delete function
  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ecofood.vercel.app/order/${id}`, {
          method: "DELETE",
        })
          .then((req) => req.json())
          .then((res) => {
            if (res.deletedCount) {
              const newCart = totalOrder.filter((one) => one._id !== id);
              setOrder(newCart);
            }
            // setCart()
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });

    // console.log("delete comming soon...");
  }
  return (
    <div>
      <Helmet>
        <title>ecoFood | My order</title>
      </Helmet>
      <h1 className="text-center text-4xl my-5 font-semibold">All Orders </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {totalOrder.map((oneOrder) => (
          <>
            <div
              className="grid grid-cols-1  gap-5 lg:grid-cols-2 p-5 rounded-lg shadow-inner shadow-slate-400"
              data-aos="fade-up">
              <div>
                <img src={oneOrder?.Image} alt="" className="max-h-[300px]" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold capitalize mb-5">
                  {oneOrder?.name}
                </h1>
                <p>Order Date : {oneOrder?.Buyingdate}</p>
                <p>Total Items : {oneOrder?.totalItems}</p>
                <p>Price per Items : {oneOrder?.Price}</p>
                <p className="capitalize">
                  Food Origin : {oneOrder?.FoodOrigin}
                </p>
                <button
                  className="btn w-full mt-5"
                  onClick={() => handleDelete(oneOrder?._id)}>
                  delete
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Myorder;
