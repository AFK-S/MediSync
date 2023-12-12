import React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStateContext } from "../../context/StateContext";

const LoginScreen = ({ navigation }) => {
  const { setLogin } = useStateContext();

  const handleLogin = async () => {
    // Set isLogin to true in the context
    setLogin(true);

    // Set isLogin to true in AsyncStorage
    try {
      // Use boolean value instead of a string
      await AsyncStorage.setItem("isLogin", JSON.stringify(true));
    } catch (error) {
      console.error("Error storing login status:", error);
    }

    // Navigate to MainScreen
    navigation.navigate("MainScreen");
  };

  const handleGoToRegister = () => {
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

export default LoginScreen;
