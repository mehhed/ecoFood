import { useEffect, useState, useTransition } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Allfood = () => {
  const [allFood, setAllFood] = useState([]);
  //  pagination
  const { count } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [];
  for (let i = 0; i < numberOfPage; i++) {
    pages.push(i);
  }

  // useEffect(() => {
  //   setAllFoods(allFood);
  // }, [allFood]);

  useEffect(() => {
    fetch(
      `https://ecofood.vercel.app/allFood?page=${currentPage}&size=${itemsPerPage}`
    )
      .then((res) => res.json())
      .then((allfoods) => setAllFood(allfoods));

    AOS.init();
  }, [currentPage]);

  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function handleSarch(e) {
    e.preventDefault();
    const form = e.target;
    const searchData = form.sarchFeild.value;
    const serch = capitalizeString(searchData);
    console.log(serch);

    fetch(
      `https://ecofood.vercel.app/serch?page=${currentPage}&size=${itemsPerPage}&categoris=${serch}`
    )
      .then((req) => req.json())
      .then((res) => setAllFood(res));
  }

  return (
    <div>
      <Helmet>
        <title>ecoFood | All Food</title>
      </Helmet>
      <h1 className="text-center text-5xl font-semibold py-5">
        Our All <span className="text-yellow-500">Foods</span>{" "}
      </h1>
      {/* search bar  */}
      <div className="flex justify-start mb-5">
        <form onSubmit={handleSarch} className="flex items-center">
          <input
            type="text"
            className="bg-gray-200 rounded-s-lg p-2 h-12"
            name="sarchFeild"
            id=""
            placeholder="Search here"
          />
          <input
            type="submit"
            value={"🔍"}
            className="btn rounded-s-none h-12"
          />
        </form>
      </div>
      {/*  all food items here  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {allFood.map((onefood) => (
          // eslint-disable-next-line react/jsx-key
          <div
            className="p-5 rounded-lg shadow-inner shadow-slate-400"
            data-aos="zoom-in-up">
            <div>
              <img
                className="md:h-[300px] w-full"
                src={onefood?.Image}
                alt=""
              />
            </div>
            <div>
              <h2 className="text-center text-2xl text-yellow-400 capitalize font-semibold">
                {onefood?.name}
              </h2>
              <p>
                {onefood.ShortDescription.length > 100 ? (
                  <>{onefood.ShortDescription.slice(0, 100)}......</>
                ) : (
                  onefood.ShortDescription
                )}
              </p>
              <div className="flex justify-between flex-wrap">
                <p className="text-lg font-medium">{onefood?.category}</p>
                <p className="capitalize text-lg font-medium">
                  {" "}
                  available items :{onefood?.Quantity}
                </p>
              </div>
              <h3 className="text-lg font-medium">Price : {onefood?.Price}</h3>
              <Link to={`/details/${onefood?._id}`}>
                {" "}
                <button className="btn w-full capitalize">see details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/*  pagination  */}
      <div className="my-4 text-center">
        <div className="join">
          {pages.map((pageNumer) => (
            // eslint-disable-next-line react/jsx-key
            <button
              onClick={() => setCurrentPage(pageNumer)}
              className={`join-item btn mx-1 ${
                currentPage === pageNumer && "bg-slate-500"
              }`}>
              {pageNumer + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allfood;
