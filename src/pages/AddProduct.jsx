import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Authentication/Authentication";
import { Helmet } from "react-helmet-async";
import { useNavigation } from "react-router-dom";

const AddProduct = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser?.email);
  function handleAddItems(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.Name.value;
    const Image = form.Image.value;
    const Price = form.Price.value;
    const Addby = form.Addby.value;
    const ShortDescription = form.ShortDescription.value;
    const category = form.category.value;
    const Quantity = form.Quantity.value;
    const FoodOrigin = form.FoodOrigin.value;
    const totalOrder = 0;
    console.log({
      name,
      Image,
      Price,
      ShortDescription,
      category,
      Addby,
      Quantity,
      FoodOrigin,
      totalOrder,
    });

    const food = {
      name,
      Image,
      Price,
      ShortDescription,
      category,
      Addby,
      Quantity,
      FoodOrigin,
      totalOrder,
    };
    fetch("https://ecofood.vercel.app/addItem", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(food),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        form.reset();
        Swal.fire({
          icon: "success",
          title: "item add successfull",
        });
      });
  }
  return (
    <div>
      <Helmet>
        <title>ecoFood | Add Product</title>
      </Helmet>
      <h1 className="text-center text-4xl my-5 font-bold">Add a new item</h1>
      <div className="bg-[#efefef] p-5 rounded-lg">
        <form onSubmit={handleAddItems}>
          <div className="grid lg:grid-cols-2 grid-cols-1  gap-5">
            <div>
              <label htmlFor="Name" className="text-lg font-bold">
                Food Name
              </label>
              <input
                type="text"
                name="Name"
                id="Name"
                className="w-full p-4 rounded-lg"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label htmlFor="Image" className="text-lg font-bold">
                Image url
              </label>
              <input
                type="text"
                name="Image"
                id="Image"
                className=" w-full p-4 rounded-lg"
                placeholder="Image url"
                required
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
                className=" w-full p-4 rounded-lg"
                required
                min={0}
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
                className=" w-full p-4 rounded-lg"
                placeholder="Price"
                required
              />
            </div>
            <div>
              <label htmlFor="ShortDescription" className="text-lg font-bold">
                Short Description
              </label>
              <input
                type="text"
                name="ShortDescription"
                id="ShortDescription"
                className=" w-full p-4 rounded-lg"
                placeholder="Short Description"
                required
              />
            </div>
            <div>
              <label htmlFor="Rating" className="text-lg font-bold">
                Add by
              </label>
              <input
                type="text"
                name="Rating"
                id="Addby"
                className=" w-full p-4 rounded-lg"
                required
                defaultValue={currentUser?.email}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="Rating" className="text-lg font-bold">
                Food Origin
              </label>
              <input
                type="text"
                name="FoodOrigin"
                placeholder="country name"
                id="Rating"
                className=" w-full p-4 rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="text-lg font-bold">
                Category
              </label>
              <select
                name="category"
                required
                id="category"
                className="w-full p-4 rounded-lg">
                <option value="">select Category</option>
                <option value="Barger">Barger</option>
                <option value="Pizza">Pizza</option>
                <option value="Drink">Drink</option>
                <option value="Coffe">Coffe</option>
                <option value="Biriyani">Biriyani</option>
              </select>
            </div>
          </div>
          <button className="w-full py-5 bg-blue-600 rounded-lg text-white text-2xl font-semibold mt-5">
            Add item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
