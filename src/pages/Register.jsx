import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    if (file) {
      console.log(file);
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot, "is in progress");
        },
        (error) => {
          setError(true);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  return (
    <div className="Register">
      <div className="register__header">
        <h2 className="register__logo">Chat App</h2>
        <p className="register__subheading">Register</p>
      </div>
      <form onSubmit={handleSubmit} className="register__form" action="#">
        <input
          type="text"
          className="register__name"
          placeholder="display name"
        />
        <input type="email" className="register__email" placeholder="email" />
        <input
          type="password"
          className="register__password"
          placeholder="password"
        />
        <input type="file" id="register__file" />
        <label htmlFor="register__file" className="register__file-label">
          <img
            src="https://raw.githubusercontent.com/safak/youtube2022/react-chat/src/img/addAvatar.png"
            alt="add icon"
          />
          <span>Add an avatar</span>
        </label>
        <button className="register__button ">Sign up</button>
      </form>
      {error && <p style={{ color: "red" }}>something went wrong</p>}
      <p>
        you do have an account?
        <Link to={"/login"} className="register__login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
