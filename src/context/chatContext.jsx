import { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useAuthContext();
  const InitialState = {
    chatId: null,
    user: {},
  };

  const handleReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(handleReducer, InitialState);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
