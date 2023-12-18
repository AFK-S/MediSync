import React, { useState, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [cookies] = useCookies();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doctorsList, setDoctorsList] = useState([]);
  const [hopitalData, setHopitalData] = useState([]);

  useEffect(() => {
    setIsLogin(cookies._id ? true : false);
  }, [cookies]);

  const getHospital = async (id) => {
    try {
      const { data } = await axios.get(`/api/dashboard/hospital/${id}`);
      setHopitalData(data);
    } catch (error) {
      alert("Failed to fetch data");
      console.error("Failed to fetch data: ", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        getHospital,
        hopitalData,
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
