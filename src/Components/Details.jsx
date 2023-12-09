import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Authentication/Authentication";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Details = () => {
  const data = useLoaderData();
  const [detailsFood] = data;
  const {
    Addby,
    name,
    ShortDescription,
    Price,
    category,
    FoodOrigin,
    _id,
    Quantity,
    Image,
  } = detailsFood;
  console.log(data);

  const { currentUser } = useContext(AuthContext);
  const email = currentUser?.email;

  function handleBuy() {
    if (parseInt(Quantity) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "items not available..",
      });
    }
  }
  return (
    <div>
      <Helmet>
        <title>ecoFood | Details | {_id}</title>
      </Helmet>
      <div className="space-y-5 py-10 px-5  mx-auto shadow-inner shadow-slate-500 rounded-lg">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <img src={Image} alt="" className="mx-auto" />
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{name}</h1>
              <button
                onClick={handleBuy}
                id="buyButton"
                disabled={email === Addby ? true : false}
                className="capitalize btn">
                <Link
                  to={
                    parseInt(Quantity) > 0 ? `/order/${_id}` : `/details/${_id}`
                  }>
                  Order Now
                </Link>
              </button>
              {/* <button onClick={handleBuy}>buy</button> */}
            </div>
            <p className="text-2xl font-bold italic">Price : {Price}</p>
            <div className="flex flex-wrap justify-between">
              <p className="mb-3 text-2xl font-bold">Category : {category}</p>
              <p className="mb-3 text-2xl font-bold">Made in : {FoodOrigin}</p>
            </div>
            <p className=" mb-3 text-2xl font-bold">Made by : {Addby}</p>

            <p className="text-lg italic text-gray-700">
              Details : {ShortDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
