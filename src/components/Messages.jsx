import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useChatContext } from "../context/chatContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const [msgs, setMsgs] = useState([]);
  const { data } = useChatContext();
  useEffect(() => {
    if (data.chatId != null) {
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        console.log(doc.data());
        doc.exists() && setMsgs(doc.data().messages);
      });
      return () => {
        unsub();
      };
    }
  }, [data.chatId]);
  console.log(msgs);
  return (
    <div className="messages">
      {msgs.length > 0 ? (
        msgs.map((m, index) => {
          return <Message messages={m} key={index} />;
        })
      ) : (
        <p>messages is empty! be the first to say hi</p>
      )}
    </div>
  );
};

export default Messages;
