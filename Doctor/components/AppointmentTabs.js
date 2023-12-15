import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View } from "react-native";
import TodaysCompletedPatient from "../screens/TodaysCompletedPatient";
import TomorrowsPatient from "../screens/TomorrowsPatient";
import StateContext from "../context/StateContext";

const Tab = createMaterialTopTabNavigator();

const AppointmentTabs = () => {
  const { doctorData } = useContext(StateContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: "#18C37D",

          height: "100%",
          borderRadius: 16,
        },
        labelStyle: { fontWeight: "bold", color: "#000" },
        activeTintColor: "#fff",
        style: { borderRadius: 16, overflow: "hidden" },
      }}
    >
      <Tab.Screen
        name="Today Completed"
        component={TodaysCompletedPatient}
        options={{
          tabBarLabel:
            doctorData &&
            doctorData.today_appointment &&
            doctorData.today_appointment[0]
              ? doctorData.today_appointment[0].date
              : "today",
        }}
      />

      <Tab.Screen
        name="Tomorrow"
        component={TomorrowsPatient}
        options={{
          tabBarLabel:
            doctorData &&
            doctorData.availability.length > 1 &&
            doctorData.availability[1].date
              ? doctorData.availability[1].date
              : "None",
        }}
      />
    </Tab.Navigator>
  );
};

export default AppointmentTabs;
