import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const initialState = {
  isLoggedIn:false,
  email:"",
  fullName:"",
  userID:"",
  portColour: {},
  portfolios: [],
  error: null,
  activePort: 0,
  activeSummary: 0,
  latestStock: "",
  currentPrice: 0,
  num: 0,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
