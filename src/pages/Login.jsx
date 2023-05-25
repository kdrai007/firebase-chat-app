import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Login = () => {
  const [Errors, setErrors] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrors(true);
    }
  };
  return (
    <div className="Register">
      <div className="register__header">
        <h2 className="register__logo">Chat App</h2>
        <p className="register__subheading">Login</p>
      </div>
      <form className="register__form" onSubmit={handleSubmit}>
        <input type="email" className="register__email" placeholder="email" />
        <input
          type="password"
          className="register__password"
          placeholder="password"
        />
        <button className="register__button ">Log In</button>
      </form>
      {Errors && <p style={{ color: "red" }}>Something went wrong</p>}
      <p>
        you don't have an account?
        <Link to={"/register"} className="register__login">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
