import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View } from "react-native";
import TodaysCompletedPatient from "../screens/TodaysCompletedPatient";
import TomorrowsPatient from "../screens/TomorrowsPatient";
import StateContext from "../context/StateContext";

const Tab = createMaterialTopTabNavigator();

const AppointmentTabs = () => {
  const { doctorData } = useContext(StateContext);
  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }
  // console.log(doctorData.availability[1].date);
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
        // options={{
        //   tabBarLabel:
        //     doctorData &&
        //     doctorData.today_appointment &&
        //     doctorData.today_appointment[0]
        //       ? doctorData.today_appointment[0].date
        //       : "today",
        // }}
        options={{
          tabBarLabel: "Today",
        }}
      />

      <Tab.Screen
        name="Tomorrow"
        component={TomorrowsPatient}
        options={{
          tabBarLabel:
            doctorData && doctorData.next_date
              ? formatDate(doctorData.next_date)
              : "None",
        }}
      />
    </Tab.Navigator>
  );
};

export default AppointmentTabs;
