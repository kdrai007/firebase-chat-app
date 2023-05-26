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
  function handleSelect(selectedUser) {
    dispatch({ type: "CHANGE_USER", payload: selectedUser });
  }
  return (
    <div className="chats">
      {Object.entries(Chats)
        .sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          return (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo.photoURL} alt="" />
              <div className="userchat-info">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
