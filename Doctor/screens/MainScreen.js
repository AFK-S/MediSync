import React from "react";
import { View, Text, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStateContext } from "../context/StateContext";

const Tab = createBottomTabNavigator();

const PatientScreen = () => (
  <View>
    <Text>Patient Screen</Text>
  </View>
);

const ProfileScreen = () => {
  const { setLogin } = useStateContext();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLogin");
    } catch (error) {
      console.error("Error removing login status:", error);
    }
    setLogin(false);
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const AppointmentScreen = () => (
  <View>
    <Text>Appointment Screen</Text>
  </View>
);

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Patient") {
            iconName = focused ? "account-heart" : "account-heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account-outline";
          } else if (route.name === "Appointment") {
            iconName = focused ? "calendar" : "calendar-blank-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#4CAF50",
        labelStyle: {
          fontSize: 10,
        },
        iconStyle: {
          marginTop: 10,
        },
      }}
    >
      <Tab.Screen name="Patient" component={PatientScreen} />
      <Tab.Screen name="Appointment" component={AppointmentScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainScreen;
