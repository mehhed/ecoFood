import "./App.css";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Authentication/Authentication";
import { Helmet } from "react-helmet-async";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation();
  console.log(navigation);
  return (
    <div className="flex flex-col h-screen px-5">
      <Navbar></Navbar>
      {navigation.state === "loading" ? (
        <div className="h-full flex-grow w-full flex justify-center items-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="flex-grow">
          <Outlet></Outlet>
        </div>
      )}
      <Helmet>
        <title>ecoFood | Home</title>
      </Helmet>

      {/* footer section  */}
      <footer className=" p-5 shadow-inner shadow-slate-400 my-5 rounded-md">
        <div className="lg:flex justify-between gap-5 items-center grid grid-cols-1">
          <div className="flex-1">
            <img
              src="https://raw.githubusercontent.com/mehhed/assignment-img/main/Yellow%20White%20Minimalist%20Kitchen%20Logo.png"
              alt=""
              className="w-28 h-28 rounded-full"
            />
            <div className="text-5xl  hover:ml-5 transition-all ">Eco Food</div>
            <p className=" pt-5 italic">
              At [ecoFood], we offer a delightful culinary experience crafted
              from the freshest ingredients and a passion for exceptional
              dining. Located in [Bangladesh], our restaurant presents a fusion
              of flavors that cater to diverse palates.
            </p>
          </div>
          <div className=" flex-1 flex justify-center gap-5">
            <Link
              to={"/"}
              className="underline hover:shadow-lg p-2 rounded-lg hover:shadow-slate-500">
              Home
            </Link>
            <Link
              to={currentUser ? "/AddProduct" : "/logIn"}
              className="underline hover:shadow-lg p-2 rounded-lg hover:shadow-slate-500">
              Add Product
            </Link>
            <Link
              to={currentUser ? "/myOrder" : "/logIn"}
              className="underline hover:shadow-lg p-2 rounded-lg hover:shadow-slate-500">
              My order
            </Link>
            <Link
              to={"/Blog"}
              className="underline hover:shadow-lg p-2 rounded-lg hover:shadow-slate-500">
              Blog
            </Link>
          </div>
        </div>

        <div className="text-center  pt-5 mt-5 border-t-2">
          © 2023 ecoFood. All rights reserved. Privacy Policy | Terms of Service
          | Contact Us
        </div>
      </footer>
    </div>
  );
}

export default App;
