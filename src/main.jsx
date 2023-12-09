import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import Details from "./Components/Details.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Authentication from "./Authentication/Authentication.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Update from "./pages/Update.jsx";
import Allfood from "./pages/Allfood.jsx";
import MyaddedFood from "./userPage/MyaddedFood.jsx";
import OrderPage from "./Components/OrderPage.jsx";
import Myorder from "./userPage/Myorder.jsx";
import { HelmetProvider } from "react-helmet-async";
import Blog from "./pages/Blog.jsx";
import PrivatRout from "./Authentication/PrivatRout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage> </ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("categori.json"),
      },
      // all food page rout
      {
        path: "/allFood",
        element: <Allfood></Allfood>,
        loader: () => fetch("https://ecofood.vercel.app/productCount"),
      },
      //  add new food rout
      {
        path: "/AddProduct",
        element: <AddProduct></AddProduct>,
      },
      // details page rout
      {
        path: "/details/:_id",
        element: <Details></Details>,
        loader: ({ params }) =>
          fetch(`https://ecofood.vercel.app/details/${params._id}`),
      },
      // log in rout
      {
        path: "/logIn",
        element: <Login></Login>,
      },

      // Blog page route
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      //  regestation page rout
      {
        path: "/register",
        element: <Register></Register>,
      },

      // update items route
      {
        path: "/updateItems/:id",
        element: <Update></Update>,
        loader: ({ params }) =>
          fetch(`https://ecofood.vercel.app/allFood/${params.id}`),
      },
      // order route
      {
        path: "/order/:_id",
        element: (
          <PrivatRout>
            <OrderPage></OrderPage>
          </PrivatRout>
        ),
        loader: ({ params }) =>
          fetch(`https://ecofood.vercel.app/allFood/${params._id}`),
      },
      // my order route ----------------------------------------------
      {
        path: "/myOrder",
        element: <Myorder></Myorder>,
      },
      // user added items page route  ============== done
      {
        path: "/Myadded",
        element: <MyaddedFood></MyaddedFood>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authentication>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Authentication>
  </React.StrictMode>
);
