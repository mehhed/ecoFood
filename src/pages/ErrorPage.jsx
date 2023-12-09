import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div className=" p-10">
        <div>
          <Link
            to={"/"}
            className="capitalize btn btn-outline hover:bg-[#b44200]">
            ⬅️ Go back
          </Link>
        </div>
        <img
          src="https://raw.githubusercontent.com/ProgrammingHero1/coffee-store-espresso-emporium/main/images/404/404.gif"
          alt=""
          className="max-w-[1000px] mx-auto"
        />
        <p className="text-3xl italic font-light text-center mx-auto">
          Page not found
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
