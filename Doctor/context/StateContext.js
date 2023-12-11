import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initial state
const initialState = {
  isLogin: false,
};

// Action types
const actionTypes = {
  SET_LOGIN: "SET_LOGIN",
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGIN:
      return { ...state, isLogin: action.payload };
    default:
      return state;
  }
};

// Context
const StateContext = createContext();

// Context Provider
export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  const setLogin = async (isLogin) => {
    dispatch({ type: actionTypes.SET_LOGIN, payload: isLogin });
    try {
      // Save the login state to AsyncStorage
      await AsyncStorage.setItem("isLogin", JSON.stringify(isLogin));
    } catch (error) {
      console.error("Error saving login state:", error);
    }
  };

  // Initialize login state from AsyncStorage
  const initializeLoginState = async () => {
    try {
      const storedLoginState = await AsyncStorage.getItem("isLogin");
      if (storedLoginState !== null) {
        dispatch({
          type: actionTypes.SET_LOGIN,
          payload: JSON.parse(storedLoginState),
        });
      }
    } catch (error) {
      console.error("Error initializing login state:", error);
    }
  };

  useEffect(() => {
    initializeLoginState();
  }, []);

  const contextValue = {
    ...state,
    setLogin,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook for using the context
export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
