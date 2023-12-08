import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, Text } from "react-native";
import { useFonts } from "expo-font";
import React, { useContext } from "react";
// import Auth from "./screens/auth/AuthScreen";
// import MainScreen from "./screens/MainScreen";
import StateContext, { StateProvider } from "./context/StateContext";
import Login from "./screens/auth/Login";
// import Loading from "./screens/pages/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-Thin": require(".//assets/Fonts/Poppins-Thin.ttf"),
    "Poppins-Medium": require(".//assets/Fonts/Poppins-Medium.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <StateProvider>
      <StatusBar barStyle={"auto"} />
      <NavigationContainer>
        <Provider />
      </NavigationContainer>
    </StateProvider>
  );
}

const Provider = () => {
  const { isLogin } = useContext(StateContext);
  return (
    <>
      {!isLogin ? (
        <StateProvider>
          <Login />
        </StateProvider>
      ) : (
        // <Auth />
        <Text>Hello</Text>
      )}
      {/* <Loading /> */}
      <Text>Hii</Text>
    </>
  );
};
