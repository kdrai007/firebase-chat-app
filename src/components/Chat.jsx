import React from "react";
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jane</span>
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
