import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useAuthContext();
  return (
    <div className="navbar">
      <span className="logo">Chat app</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>
          {currentUser.displayName ? currentUser.displayName : "john doe"}
        </span>
        <button onClick={async () => await signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
