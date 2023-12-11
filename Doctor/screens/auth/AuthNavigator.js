// AuthNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";
import Login from "./Login.js";
import Register from "./Register";

const Stack = createNativeStackNavigator();

const BackButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Text>Back</Text>
  </TouchableOpacity>
);

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          header: ({ navigation }) => <BackButton navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
