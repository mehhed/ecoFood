import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import { BiSolidUser } from "react-icons/bi";
import { AuthContext } from "../Authentication/Authentication";

const Navbar = () => {
  const [navbar, setnavbar] = useState(false);
  const navigate = useNavigate();

  const { currentUser, signOutuser, setUser } = useContext(AuthContext);
  console.log(currentUser);
  const signOutUses = () => {
    signOutuser()
      .then(() => {
        console.log("// Sign-out successful.");
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const [theme, setTheme] = useState(null);
  if (theme) {
    const changeTheme = document.getElementById("theme");
    changeTheme.removeAttribute("data-theme", "light");
    changeTheme.setAttribute("data-theme", "dark");
  } else {
    const changeTheme = document.getElementById("theme");
    changeTheme.removeAttribute("data-theme", "dark");
    changeTheme.setAttribute("data-theme", "light");
  }

  console.log(theme);
  return (
    <div>
      <div className="sticky top-0 py-4 px-5  z-50">
        <div className="flex justify-between items-center h-full w-full">
          {/* site name and logo */}
          <div className=" text-2xl md:text-3xl flex-1 flex gap-5 items-center">
            <img
              src="https://raw.githubusercontent.com/mehhed/assignment-img/main/Yellow%20White%20Minimalist%20Kitchen%20Logo.png"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <h1>Eco Food </h1>
          </div>
          {/* navigation menu  */}
          <div
            onClick={() => {
              setnavbar(!navbar);
            }}
            className="lg:hidden cursor-pointer text-2xl flex justify-end flex-1 ">
            {navbar ? <AiOutlineClose /> : <HiOutlineMenu />}
          </div>
          <div
            className={`lg:flex  flex-1 ${
              navbar ? "block" : "hidden"
            } absolute lg:static top-full left-0 w-full bg-white px-5 lg:bg-transparent justify-end z-40`}>
            <ul className="flex flex-col lg:flex-row lg:justify-end justify-start gap-x-5 lg:items-center font-bold">
              <li className="lg:my-1 my-1">
                <NavLink
                  onClick={() => {
                    setnavbar(!navbar);
                  }}
                  to={`/`}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "active text-[#15fffd]"
                      : isPending
                      ? "pending"
                      : "block lg:inline-block"
                  }>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  onClick={() => {
                    setnavbar(!navbar);
                  }}
                  to={`/allFood`}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "active text-[#15fffd]"
                      : isPending
                      ? "pending"
                      : ""
                  }>
                  All Food
                </NavLink>
              </li>

              <li className="lg:my-1 my-1">
                <NavLink
                  onClick={() => {
                    setnavbar(!navbar);
                  }}
                  to={`/Blog`}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "active text-[#15fffd]"
                      : isPending
                      ? "pending"
                      : ""
                  }>
                  Blog
                </NavLink>
              </li>

              {/* toggle theme */}
              <li>
                <div>
                  <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" />

                    {/* sun icon */}
                    <svg
                      onClick={() => setTheme(true)}
                      className="swap-on fill-current w-10 h-10"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    {/* moon icon */}
                    <svg
                      onClick={() => setTheme(false)}
                      className="swap-off fill-current w-10 h-10"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                  </label>
                </div>
              </li>
              {/*  log in log out toggle  */}
              {currentUser ? (
                <li>
                  <span className="btn" onClick={signOutUses}>
                    sign out
                  </span>
                </li>
              ) : (
                <li>
                  <Link
                    to={"/logIn"}
                    onClick={() => {
                      setnavbar(!navbar);
                    }}>
                    <button className="btn"> Log In</button>
                  </Link>
                </li>
              )}
              {/*  user information  */}
              <li className="lg:my-1 my-1">
                {currentUser && (
                  <div className="dropdown lg:dropdown-bottom lg:dropdown-end dropdown-center">
                    <label tabIndex={0} className="btn-circle text-2xl">
                      <img
                        src={currentUser?.photoURL}
                        alt=""
                        className="h-9 w-9 rounded-full"
                      />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box w-52 space-y-2">
                      {/* My added food */}
                      <li className="border rounded-lg">
                        <NavLink
                          onClick={() => {
                            setnavbar(!navbar);
                          }}
                          to={`/Myadded`}
                          className={({ isActive, isPending }) =>
                            isActive
                              ? "active text-[#15fffd]"
                              : isPending
                              ? "pending"
                              : ""
                          }>
                          My added food
                        </NavLink>
                      </li>
                      {/* add new items  */}
                      <li className="border rounded-lg">
                        <NavLink
                          onClick={() => {
                            setnavbar(!navbar);
                          }}
                          to={`/AddProduct`}
                          className={({ isActive, isPending }) =>
                            isActive
                              ? "active text-[#15fffd]"
                              : isPending
                              ? "pending"
                              : ""
                          }>
                          Add a food
                        </NavLink>
                      </li>
                      {/* My ordered  */}
                      <li className="border rounded-lg">
                        <NavLink
                          onClick={() => {
                            setnavbar(!navbar);
                          }}
                          to={`/myOrder`}
                          className={({ isActive, isPending }) =>
                            isActive
                              ? "active text-[#15fffd]"
                              : isPending
                              ? "pending"
                              : ""
                          }>
                          My ordered
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
