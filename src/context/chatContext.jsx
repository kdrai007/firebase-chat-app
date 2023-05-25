import { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const InitialState = {
    chatId: "null",
    user: {},
  };

  const handleReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_CHAT":
        console.log("Changing Chat", action.payload);
        break;

      default:
        break;
    }
  };
  const [state, dispatch] = useReducer(handleReducer, InitialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
