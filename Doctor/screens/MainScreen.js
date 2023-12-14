import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Patients from "./Patients";
import PatientDetailsScreen from "./PatientDetailsScreen"; // Import the new screen
import AppointmentsScreen from "./AppointmentsScreen";
import Profile from "./Profile";
import StateContext from "../context/StateContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PatientsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Patients"
        component={Patients}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PatientDetails"
        component={PatientDetailsScreen}
        options={{ title: "Patient Details" }}
      />
    </Stack.Navigator>
  );
};

const AppointmentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PatientDetails"
        component={PatientDetailsScreen}
        options={{ title: "Patient Details" }}
      />
    </Stack.Navigator>
  );
};

const MainScreen = () => {
  const { isLogin } = useContext(StateContext);
  useEffect(() => {
    if (!isLogin) navigation.navigate("Login");
  }, []);
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
        component={PatientsStack}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentStack}
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
