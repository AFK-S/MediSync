import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "./screens/auth/AuthNavigator.js";
import MainScreen from "./screens/MainScreen.js";
import Login from "./screens/auth/LoginScreen.js";
import Register from "./screens/auth/Register.js";
import { StateProvider, useStateContext } from "./context/StateContext";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { isLogin, loading, setLoading } = useStateContext();
  const [asyncStorageExists, setAsyncStorageExists] = useState(false);

  useEffect(() => {
    setLoading(true);
    const checkAsyncStorage = async () => {
      try {
        const isLoginValue = await AsyncStorage.getItem("isLogin");
        setAsyncStorageExists(!!isLoginValue);

        console.log("isLoginValue:", isLoginValue);
      } catch (error) {
        console.error("Error checking AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAsyncStorage();
  }, []);

  const LoadingOverlay = () => (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color="green" />
    </View>
  );

  useEffect(() => {
    console.log(loading);
  }, []);

  return (
    <>
      {loading && <LoadingOverlay />}
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", paddingBottom: 12 }}
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              animation: "slide_from_left",
            }}
          >
            {isLogin ? (
              <Stack.Screen name="MainScreen" component={MainScreen} />
            ) : (
              <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

const App = () => {
  return (
    <StateProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <AppNavigator />
      </SafeAreaView>
    </StateProvider>
  );
};

export default App;
