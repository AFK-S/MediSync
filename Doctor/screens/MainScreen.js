import { View, Text, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Schedule from "./pages/Schedule";
import Profile from "./pages/Profile";

const MainScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <Tab.Navigator
        initialRouteName="SOS"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            padding: 50,
            height: 100,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.07,
            shadowRadius: 20,
            elevation: 2,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  top: Platform.OS === "android" ? 0 : -15,
                  padding: 20,
                  borderRadius: 15,
                  aspectRatio: 1,
                }}
              >
                <Image
                  source={require("../assets/icons/home.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            ),
          }}
          component={Home}
        />
        <Tab.Screen
          name="Appointment"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  top: Platform.OS === "android" ? 0 : -15,
                  padding: 20,
                  borderRadius: 15,
                  aspectRatio: 1,
                }}
              >
                <Image
                  source={require("../assets/icons/appointment.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            ),
          }}
          component={Appointment}
        />
        <Tab.Screen
          name="Schedule"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  top: Platform.OS === "android" ? 0 : -15,
                  padding: 20,
                  borderRadius: 15,
                  aspectRatio: 1,
                }}
              >
                <Image
                  source={require("../assets/icons/schedule.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            ),
          }}
          component={Schedule}
        />
        <Tab.Screen
          name="Profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  top: Platform.OS === "android" ? 0 : -15,
                  padding: 20,
                  borderRadius: 15,
                  aspectRatio: 1,
                }}
              >
                <Image
                  source={require("../assets/icons/profile.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainScreen;
