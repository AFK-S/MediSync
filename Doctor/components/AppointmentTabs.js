import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View } from "react-native";
import TodaysCompletedPatient from "../screens/TodaysCompletedPatient";
import TomorrowsPatient from "../screens/TomorrowsPatient";

const Tab = createMaterialTopTabNavigator();

const AppointmentsScreen = ({ route }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{route.name} Screen Content</Text>
    </View>
  );
};

const AppointmentTabs = () => {
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
        options={{ tabBarLabel: "Today's Completed" }}
      />
      <Tab.Screen
        name="Tomorrow"
        component={TomorrowsPatient}
        options={{ tabBarLabel: "Tomorrow" }}
      />
    </Tab.Navigator>
  );
};

export default AppointmentTabs;
