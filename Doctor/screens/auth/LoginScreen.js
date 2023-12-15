import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StateContext from "../../context/StateContext";

const LoginScreen = ({ navigation }) => {
  const { Login, FirstTimeLogin, isLogin, setIsLogin } =
    useContext(StateContext);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isLogin) {
        navigation.navigate("MainScreen");
      }
    };

    checkLoginStatus();
  }, [isLogin, navigation]);

  const handleLoginPress = async () => {
    try {
      const mac_address = await AsyncStorage.getItem("mac_address");
      console.log(mac_address);

      if (mac_address == null) {
        await FirstTimeLogin(login.username, login.password);
      } else {
        await Login(login.username, login.password, mac_address);
        setIsLogin(true);
        navigation.navigate("MainScreen");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.innerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          value={login.username}
          onChangeText={(text) =>
            setLogin({ ...login, username: text.toLowerCase() })
          }
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={login.password}
          onChangeText={(text) => setLogin({ ...login, password: text })}
          required
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoToRegister}>
          <Text style={styles.registerLink}>Go to Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: "center",
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
  registerLink: {
    color: "#18C37D",
    marginTop: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
