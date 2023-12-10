import React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStateContext } from "../../context/StateContext.js";

const Register = ({ navigation }) => {
  const { setLogin } = useStateContext();

  const handleRegister = async () => {
    // Set isLogin to true in the context
    setLogin(true);

    // Set isLogin to true in AsyncStorage
    try {
      await AsyncStorage.setItem("isLogin", "true");
    } catch (error) {
      console.error("Error storing login status:", error);
    }

    // You can add additional registration logic here if needed

    // Navigate to MainScreen or any other screen
    navigation.navigate("MainScreen");
  };

  return (
    <View>
      <Text>Register Screen</Text>
      {/* Add your registration UI here */}
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Back to Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </View>
  );
};

export default Register;
