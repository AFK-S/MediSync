import React, { useState, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [cookies] = useCookies();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    setIsLogin(cookies._id ? true : false);
  }, [cookies]);

  return (
    <StateContext.Provider
      value={{
        loading,
        setLoading,
        isLogin,
        setIsLogin,
        doctorsList,
        setDoctorsList,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
