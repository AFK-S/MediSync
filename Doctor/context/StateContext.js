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
  const [patientData, setpatientData] = useState();

  useEffect(() => {
    (async () => {
      // await AsyncStorage.clear();
      // Alert.alert("Cleared");
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
    // console.log(data);
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
    // console.log(data);
    await AsyncStorage.setItem("_id", data._id);
    await AsyncStorage.setItem("mac_address", data.mac_address);
  };

  const getProfile = async () => {
    setLoading(true);
    const id = await AsyncStorage.getItem("_id");
    console.log("Doctor ID:", id);
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/dashboard/doctor/${id}`
      );
      // console.log("Data from server:", data);
      // Sort availability by date
      const sortedAvailability = data.availability.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

      setDoctorData({
        ...data,
        availability: sortedAvailability,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
      Alert.alert("Cannot get Data");
    } finally {
      setLoading(false);
    }
  };

  const markAttended = async (appointment_id) => {
    try {
      const { data } = await axios.put(
        `${SERVER_URL}/api/appointment/mark_as_done/${appointment_id}`
      );

      // Assuming you have an API endpoint to fetch updated data
      getProfile();
    } catch (error) {
      console.error("Error marking attended:", error);
      Alert.alert("Cannot mark Attend");
    }
  };

  const getPatientInfo = async (id) => {
    setpatientData(null);
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/dashboard/patient/${id}`
      );
      data.past_visit.sort((a, b) => new Date(b.date) - new Date(a.date));

      setpatientData(data);
      return data;
    } catch (error) {
      console.error("Error fetching patient data:", error);
      Alert.alert("Cannot get Patient data");
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
        markAttended,
        getPatientInfo,
        patientData,
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
