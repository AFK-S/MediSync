import React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStateContext } from "../../context/StateContext.js";

const Login = ({ navigation }) => {
  const { setLogin } = useStateContext();

  const handleLogin = async () => {
    // Set isLogin to true in the context
    setLogin(true);

    // Set isLogin to true in AsyncStorage
    try {
      await AsyncStorage.setItem("isLogin", "true");
    } catch (error) {
      console.error("Error storing login status:", error);
    }

    // Navigate to MainScreen
    navigation.navigate("MainScreen");
  };

  const handleGoToRegister = () => {
    // Navigate to the Register screen
    navigation.navigate("Register");
  };

  return (
    <View>
      <Text>Login</Text>
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Register" onPress={handleGoToRegister} />
    </View>
  );
};

export default Login;
