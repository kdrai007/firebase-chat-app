import React from "react";
import Messages from "./Messages";
import Input from "./Input";
import { useChatContext } from "../context/chatContext";

const Chat = () => {
  const { data } = useChatContext();
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="chatIcons">
          <img
            src="https://raw.githubusercontent.com/safak/youtube2022/react-chat/src/img/add.png"
            alt="add friend icon"
          />
          <img
            src="https://raw.githubusercontent.com/safak/youtube2022/react-chat/src/img/more.png"
            alt="more icon"
          />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
