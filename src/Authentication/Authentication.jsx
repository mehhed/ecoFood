import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";

import app from "../firebase.config.js";

export const AuthContext = createContext(null);

const Authentication = ({ children }) => {
  const [currentUser, setUser] = useState(null);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signUP = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutuser = () => {
    return signOut(auth);
  };

  const signUpByGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(user);
      console.log(user);

      if (currentUser) {
        axios
          .post("https://ecofood.vercel.app/jwt", loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("token response", res.data);
          });
      } else {
        axios
          .post("https://ecofood.vercel.app/logOut", loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });
      }
      // if (user) {
      //   // console.log(user);
      //   // create jot token
      //   axios
      //     .post("https://ecofood.vercel.app/jwt", loggedUser, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       console.log("token respons", res.data);
      //     });
      //   // ...
      // } else {
      //   // User is signed out
      //   // ...
      //   axios
      //     .post("https://ecofood.vercel.app/logOut", loggedUser, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       console.log(res.data);
      //     });
      // }
    });
  }, [auth, currentUser?.email]);
  const send = {
    currentUser,
    setUser,
    signin,
    signUP,
    signOutuser,
    signUpByGoogle,
  };
  return <AuthContext.Provider value={send}>{children}</AuthContext.Provider>;
};

export default Authentication;
