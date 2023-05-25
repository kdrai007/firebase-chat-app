import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { useChatContext } from "../context/chatContext";

const Chats = () => {
  const [Chats, setChats] = useState([]);
  const { currentUser } = useAuthContext();
  const { dispatch } = useChatContext();
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  function handleSelect() {
    dispatch({ type: "CHANGE_CHAT", payload: "hello there" });
  }
  return (
    <div className="chats">
      {Object.entries(Chats).map((chat) => {
        return (
          <div className="userChat" key={chat[0]} onClick={handleSelect}>
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userchat-info">
              <span>{chat[1].userInfo.displayName}</span>
              <p>hello! how are you</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
