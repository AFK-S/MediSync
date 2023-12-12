import { View, Text, Button } from "react-native";
import React from "react";
import { useStateContext } from "../context/StateContext";

const Profile = () => {
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
      <Text>Profile</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;
