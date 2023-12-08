import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, createContext, useContext } from "react";
const StateContext = createContext();
export default StateContext;

export const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [User, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user");
      if (user === null) return setIsLogin(false);
      const { user_id, password } = await JSON.parse(user);
      if (!(user_id && password)) return setIsLogin(false);
      setUser(await JSON.parse(user));
      setIsLogin(true);
    })();
  }, [isLogin]);

  const Logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    setIsLogin(false);
  };
  return (
    <StateContext.Provider
      value={{
        loading,
        setLoading,
        isLogin,
        setIsLogin,
        User,
        setUser,
        Logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
