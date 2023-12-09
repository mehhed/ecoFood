import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../Authentication/Authentication";
const MyaddedFood = () => {
  const { currentUser } = useContext(AuthContext);

  const [Mydata, setMyData] = useState([]);

  useEffect(() => {
    fetch(`https://ecofood.vercel.app/addItem/${currentUser?.email}`)
      .then((req) => req.json())
      .then((res) => setMyData(res));

    AOS.init();
  }, [currentUser?.email]);

  return (
    <div>
      <Helmet>
        <title>ecoFood | My Food</title>
      </Helmet>
      <h1 className="text-center text-5xl font-semibold my-5">
        My <span className="text-yellow-500">Food</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Mydata.map((onefood) => (
          // eslint-disable-next-line react/jsx-key
          <div
            className="p-5 rounded-lg shadow-inner shadow-slate-400"
            data-aos="fade-up">
            <div>
              <img
                className="md:h-[300px] w-full"
                src={onefood?.Image}
                alt=""
              />
            </div>
            <div>
              <h2 className="my-5 text-center text-2xl text-yellow-400 capitalize font-semibold">
                {onefood?.name}
              </h2>
              <div className="flex justify-between flex-wrap">
                <p className="text-lg font-medium">{onefood?.category}</p>
                <p className="capitalize text-lg font-medium">
                  {" "}
                  available items :{onefood?.Quantity}
                </p>
              </div>
              <div className="flex flex-wrap justify-between">
                <h3 className="mb-5 text-lg font-medium">
                  Price : {onefood?.Price}
                </h3>
                <h3 className="mb-5 text-lg font-medium">
                  total Order : {onefood?.totalOrder}
                </h3>
              </div>
              <Link to={`/updateItems/${onefood?._id}`}>
                <button className="btn w-full capitalize">update</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyaddedFood;
