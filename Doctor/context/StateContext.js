import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_URL } from "../config.js";
import { Alert } from "react-native";

const StateContext = createContext();
export default StateContext;

export const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [doctorId, setDoctorId] = useState();
  const [doctorData, setDoctorData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const _id = await AsyncStorage.getItem("_id");
      const mac_address = await AsyncStorage.getItem("mac_address");

      if (_id == null || mac_address == null) setIsLogin(false);
      else {
        setDoctorId(_id);
        setIsLogin(true);
      }
    })();
  }, []);

  const Login = async (username, password, mac_address) => {
    const { data } = await axios.post(`${SERVER_URL}/api/doctor/login`, {
      username,
      password,
      mac_address,
    });
    console.log(data);
    await AsyncStorage.setItem("_id", data);
  };

  const FirstTimeLogin = async (username, password) => {
    const { data } = await axios.post(
      `${SERVER_URL}/api/doctor/first_time/login`,
      {
        username,
        password,
      }
    );
    console.log(data);
    await AsyncStorage.setItem("_id", data._id);
    await AsyncStorage.setItem("mac_address", data.mac_address);
  };

  const getProfile = async () => {
    setLoading(true);
    const id = await AsyncStorage.getItem("_id");
    try {
      const { data } = await axios.get(`${SERVER_URL}/api/doctor/${id}`);
      setDoctorData(data);
    } catch (error) {
      Alert.alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StateContext.Provider
      value={{
        isLogin,
        setIsLogin,
        Login,
        FirstTimeLogin,
        getProfile,
        doctorData,
        loading,
        setLoading,
      }}
    >
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
