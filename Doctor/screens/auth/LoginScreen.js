import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";
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
    <>
      {/* <Image
        source={require("../../assets/logo.png")}
        style={{ width: 150, height: 150, borderRadius: 100 }}
      /> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            // Add onChangeText prop to handle input changes
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            // Add onChangeText prop to handle input changes
          />
          <TouchableOpacity
            style={styles.button}
            title="Login"
            onPress={handleLogin}
          >
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Go to Register"
            onPress={handleGoToRegister}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    padding: 40,
    marginBottom: 80,
    borderRadius: 30,
  },

  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 16,
    padding: 12,
    width: 300,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#18C37D",
    height: 50,
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 30,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LoginScreen;
