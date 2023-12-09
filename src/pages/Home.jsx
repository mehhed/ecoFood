import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";
import Swal from "sweetalert2";

const Home = () => {
  // use state for galley
  const [gallery, setGallery] = useState([]);
  // use state for team section
  const [teamData, setTeamData] = useState([]);
  // useState for top food
  const [topFood, setTopFood] = useState([]);
  useEffect(() => {
    fetch("https://ecofood.vercel.app/team")
      .then((req) => req.json())
      .then((res) => setTeamData(res));

    fetch("https://ecofood.vercel.app/allFood")
      .then((req) => req.json())
      .then((res) => setGallery(res));

    fetch("https://ecofood.vercel.app/topOrder")
      .then((req) => req.json())
      .then((res) => setTopFood(res));
  }, []);
  //  function for contact form
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    Swal.fire({
      icon: "success",
      title: "Our teem will contact with you...",
    });
    form.reset();
  };

  return (
    <div>
      {/* banner section */}
      <div className="flex flex-col-reverse lg:flex-row text-center gap-5 p-5 shadow-inner  shadow-slate-300 rounded-lg">
        <div className="flex-grow flex items-center  justify-center">
          <div>
            <h1 className="lg:text-7xl md:text-3xl text-2xl font-semibold">
              Get Fresh <span className="text-yellow-400 italic"> Food </span>{" "}
              <br /> in a Easy Way
            </h1>
            <Link to={"/allFood"}>
              <button className="btn mt-7 btn-warning">see all</button>
            </Link>
          </div>
        </div>
        <div className="flex-grow">
          <img
            className="w-4/5 mx-auto"
            src="https://raw.githubusercontent.com/mehhed/assignment-img/main/main_img.png"
            alt=""
          />
        </div>
      </div>

      {/* Top Food */}
      <div className="mt-5 shadow-inner shadow-slate-400 rounded-lg p-5">
        <h1 className="text-center text-5xl font-medium  font-serif">
          Top <span className="text-yellow-400 ">Food</span>
        </h1>
        {/* top food card here  */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 my-5 lg:grid-cols-3">
          {topFood.map((one) => (
            <div
              key={one?._id}
              className="grid grid-cols-1 gap-5 p-5 rounded-lg shadow-inner shadow-slate-500 xl:grid-cols-2">
              <div className="flex justify-center items-center">
                <img src={one?.Image} alt="" className="max-h-[100px]" />
              </div>
              <div className="flex-grow">
                <p className="text-lg font-serif text-center xl:text-left">
                  {one?.name}
                </p>
                <p>{one?.Price}</p>
                <p>{one?.category}</p>
                <p className="capitalize">{one?.FoodOrigin}</p>
                <div className="text-right">
                  <button className="btn btn-sm capitalize mt-5">
                    <Link to={`/details/${one?._id}`}>see details</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* see all button */}
        <div className="mt-5 text-center">
          <button className="btn btn-info">
            {" "}
            <Link to={"/allFood"}>see all</Link>
          </button>
        </div>
      </div>

      {/* gallery section  */}
      <div className="p-5 rounded-lg mt-5 shadow-inner shadow-slate-500">
        <div className="">
          <h1 className="text-center text-5xl font-serif font-medium py-5">
            Our <span className="text-yellow-500">Gallery</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-5  ">
            {gallery.slice(0, 8).map((gl) => (
              <>
                <div className="h-40 relative rounded-lg gallery-img-contaner shadow-inner  shadow-slate-200 p-5">
                  <img src={gl.Image} className="h-full mx-auto" alt="" />
                  <div className="absolute top-0 right-0 text-3xl font-bold text-purple-400 w-full h-full flex justify-center items-center bg-black bg-opacity-50 rounded-lg gallery-img-name">
                    {gl.name}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      {/* team section  */}
      <div className="mt-5 py-5 shadow-inner shadow-slate-500 rounded-lg pb-10 bg-team">
        <div className="team">
          <h1>
            Our<span>Team</span>
          </h1>

          <div className="team_box ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {teamData.map((oendata) => (
                <div key={oendata?._id}>
                  <div className="profile">
                    <img src={oendata.image} />
                    <div className="info">
                      <h2 className="name ">{oendata?.name}</h2>
                      <h2 className="name">{oendata?.positon}</h2>
                      <div className="team_icon">
                        <i className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-instagram"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* contact section  */}
      <div className="shadow-inner shadow-slate-500 rounded-lg p-5 mt-5">
        <h1 className="text-6xl text-center my-4">
          Conatact <span className="text-yellow-400">us</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex-1">
            <Iframe
              className="rounded-lg"
              url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60415.23562680683!2d91.81060227219949!3d22.364597498714744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad270e1868679b%3A0x2a77aa3a90d79a6e!2sK.B.%20Aman%20Ali%20Rd%2C%20Chittagong!5e0!3m2!1sen!2sbd!4v1695490742808!5m2!1sen!2sbd"
              width="100%"
              height="450"
              frameborder="0"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></Iframe>
          </div>
          <div className="flex-1">
            <form
              onSubmit={handleSubmit}
              className="w-full border-2 rounded-lg border-[#3b82f6] p-5">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-white font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-white font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none h-32 resize-none"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
