import React from "react";
import { View, Text, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStateContext } from "../context/StateContext";
import AppointmentsScreen from "./AppointmentsScreen";
import Profile from "./Profile";
import Patients from "./Patients";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Appointments"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Patient") {
            iconName = focused ? "account-heart" : "account-heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account-outline";
          } else if (route.name === "Appointments") {
            iconName = focused ? "calendar" : "calendar-blank-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#18C37D",
        labelStyle: {
          fontSize: 10,
        },
        iconStyle: {
          marginTop: 10,
        },
      }}
    >
      <Tab.Screen
        name="Patient"
        options={{ headerShown: false }}
        component={Patients}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
