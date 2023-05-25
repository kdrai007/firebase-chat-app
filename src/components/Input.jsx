import React from "react";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something..." />
      <div className="send">
        <img
          src="https://raw.githubusercontent.com/safak/youtube2022/react-chat/src/img/attach.png"
          alt="attach icon"
        />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img
            src="https://raw.githubusercontent.com/safak/youtube2022/react-chat/src/img/img.png"
            alt="img icon"
          />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
