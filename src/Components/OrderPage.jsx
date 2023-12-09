import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Authentication/Authentication";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const OrderPage = () => {
  const forOrder = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const buyerName = currentUser?.displayName;
  const buyerEmail = currentUser?.email;
  //   console.log(currentUser);
  let {
    Addby,
    name,
    ShortDescription,
    Price,
    category,
    FoodOrigin,
    _id,
    Quantity,
    Image,
    totalOrder,
  } = forOrder;
  console.log(Quantity);

  function handleOrder(e) {
    e.preventDefault();
    const form = e.target;
    const buyerName = form.buyerName.value;
    const buyerEmail = form.buyerEmail.value;
    const totalItems = form.Quantity.value;
    const Buyingdate = form.Buyingdate.value;
    // for order
    const sendOrder = {
      buyerEmail,
      buyerName,
      totalItems,
      Buyingdate,
      name,
      Image,
      category,
      Price,
      FoodOrigin,
      ShortDescription,
    };

    // for update ===============
    // new quntity
    let newQuantity = parseFloat(Quantity) - parseFloat(totalItems);
    Quantity = newQuantity;
    // total order
    let neworder = parseFloat(totalOrder) + parseFloat(totalItems);
    totalOrder = neworder;

    const forUpdate = {
      Addby,
      name,
      ShortDescription,
      Price,
      category,
      FoodOrigin,
      Quantity,
      Image,
      totalOrder,
    };
    console.log(forUpdate);
    fetch("https://ecofood.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sendOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetch(`https://ecofood.vercel.app/addItem/${_id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(forUpdate),
        });
        form.reset();
        history.back(2);
        Swal.fire({
          icon: "success",
          title: "Your order is successfull",
        });
      });
  }

  function alerOrder() {
    if (Addby === buyerEmail) {
      return alert("this item added by you , you can not order this items");
    }
  }

  return (
    <div className="p-5 shadow-inner shadow-slate-500 rounded-lg">
      <Helmet>
        <title>ecoFood | Order</title>
      </Helmet>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div>
          <img src={Image} alt="" />
        </div>
        <div>
          <form onSubmit={handleOrder}>
            <div className="grid lg:grid-cols-2 grid-cols-1  gap-5">
              <div>
                <label htmlFor="Name" className="text-lg font-bold">
                  Food Name
                </label>
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  className="w-full p-4 rounded-lg border"
                  placeholder="Name"
                  required
                  defaultValue={name}
                />
              </div>
              {/* buyer name  */}
              <div>
                <label htmlFor="buyerName" className="text-lg font-bold">
                  Buyer Name
                </label>
                <input
                  type="text"
                  name="buyerName"
                  id="buyerName"
                  className="w-full p-4 rounded-lg border"
                  required
                  readOnly
                  defaultValue={buyerName}
                />
              </div>
              {/* buyer email  */}
              <div>
                <label htmlFor="buyerName" className="text-lg font-bold">
                  Buyer Email
                </label>
                <input
                  type="text"
                  name="buyerEmail"
                  id="buyerEmail"
                  className="w-full p-4 rounded-lg border"
                  required
                  readOnly
                  defaultValue={buyerEmail}
                />
              </div>
              <div>
                <label htmlFor="BrandName" className="text-lg font-bold">
                  Quantity
                </label>
                <input
                  type="number"
                  name="Quantity"
                  id="BrandName"
                  placeholder="quantity number"
                  className=" w-full p-4 rounded-lg border"
                  required
                  max={Quantity}
                  min={1}
                  defaultValue={1}
                />
              </div>
              <div>
                <label htmlFor="Price" className="text-lg font-bold">
                  Price
                </label>
                <input
                  type="text"
                  name="Price"
                  id="Price"
                  className=" w-full p-4 rounded-lg border"
                  placeholder="Price"
                  required
                  defaultValue={Price}
                />
              </div>
              <div>
                <label htmlFor="Rating" className="text-lg font-bold">
                  Buying date
                </label>
                <input
                  type="date"
                  name="Buyingdate"
                  placeholder="country name"
                  id="Rating"
                  className=" w-full p-4 rounded-lg border"
                  required
                />
              </div>
            </div>
            <button
              onClick={alerOrder}
              disabled={Addby === buyerEmail ? true : false}
              className="w-full py-5 bg-blue-600 rounded-lg text-white text-2xl font-semibold mt-5 disabled:bg-[#cad0d7]">
              Confirm order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
