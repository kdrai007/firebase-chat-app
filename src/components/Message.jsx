import React, { useEffect, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useChatContext } from "../context/chatContext";

const Message = ({ messages }) => {
  const { currentUser } = useAuthContext();
  const { data } = useChatContext();
  // console.log(messages);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div
      ref={ref}
      className={`message ${currentUser.uid === messages.senderId && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            currentUser.uid === messages.senderId
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="avatar"
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        {messages.text?.length > 0 && <p>{messages.text}</p>}
        {messages.img && <img src={messages.img} alt="avatar" />}
      </div>
    </div>
  );
};

export default Message;
