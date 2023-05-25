import React from "react";
import Register from "./Register";
import Login from "./Login";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import "../styles/home.css";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useAuthContext();

  if (currentUser) {
    return (
      <div className="home">
        <div className="container">
          <Sidebar />
          <Chat />
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
};

export default Home;
