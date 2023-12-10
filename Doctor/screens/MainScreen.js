import React from "react";
import { View, Text, Button } from "react-native";
import { useStateContext } from "../context/StateContext";

const MainScreen = () => {
  const { setLogin } = useStateContext();

  const handleLogout = () => {
    // Set isLogin to false
    setLogin(false);

    // You can also navigate to the login screen if needed
    // For example, if you are using React Navigation:
    // navigation.navigate("LoginScreen");
  };

  return (
    <View>
      <Text>MainScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default MainScreen;
