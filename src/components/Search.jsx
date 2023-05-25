import React from "react";
import { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useAuthContext();
  //Searching the user in database in firebase
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        // console.log(doc.id, "=>", doc.data());
      });
    } catch (error) {
      setErr(true);
      console.log(error);
    }
  };
  //handling the user input
  const handleKey = (e) => {
    if (e.code == "Enter") {
      handleSearch();
    }
  };
  //function for making contact with the searched user
  const handleSelect = async () => {
    const combinedUid =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedUid));
      if (!res.exists()) {
        //creating collection of chats
        await setDoc(doc(db, "chats", combinedUid), { messages: [] });
        //creating users chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedUid + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedUid + ".data"]: serverTimestamp(),
        });
        //updating searched user chat
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedUid + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedUid + ".data"]: serverTimestamp(),
        });
      }
    } catch (error) {
      // setErr(true);
      console.log(error);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKey}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {err && <span>user not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="avatar icon" />
          <div className="userchat-info">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
