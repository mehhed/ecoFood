import React, { useContext, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authentication/Authentication";

const CatagriCard = ({ sendData }) => {
  const { currentUser } = useContext(AuthContext);

  const [rate, setrate] = useState([]);
  const { Image, name, ShortDescription, Price, category, Rating, _id } =
    sendData;

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(Rating)) {
      stars.push(
        <span key={i} className="star">
          &#9733;
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="star">
          &#9734;
        </span>
      );
    }
  }

  // console.log(items);
  // console.log(carRating);
  // console.log(sendData);

  return (
    <div className="shadow-inner bg-gray-400 rounded-lg">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img src={Image} className="mb-5" />
        </figure>
        <div className="card-body p-0">
          <h2 className="card-title">{name}</h2>
          <p>
            {ShortDescription.length > 100
              ? `${ShortDescription.slice(0, 100)}....`
              : ShortDescription}
          </p>
          <div className="flex flex-wrap">
            <p className="text-3xl">{Price}</p>
            <p className=" text-3xl">{category}</p>
          </div>
          <div className="flex gap-4  star-rating text-orange-500">{stars}</div>
          <div className="card-actions justify-center">
            <Link to={`${currentUser ? `/details/${_id}` : "/logIn"}`}>
              <button className="btn">see details</button>
            </Link>
            <Link to={`/updateItems/${_id}`}>
              <button className="btn">update</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatagriCard;
