import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import StateContext from "../context/StateContext";

const TomorrowsPatient = () => {
  const { doctorData } = useContext(StateContext);
  const navigation = useNavigation();
  const nextDay = doctorData && doctorData.availability[1];
  const [nextPatientData, setNextPatientData] = useState([]);

  const patientData = [
    {
      name: "Karandeep Singh Sandhu",
      age: 19,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      medical_history: "NA",
      symptoms: ["Cough", "Fever"],
      date: "23-10-2023",
      time: "10:15pm",
    },
    {
      name: "Aditya Rai",
      age: 32,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      medical_history: "NA",
      symptoms: ["Fever"],
      date: "23-10-2023",
      time: "10:15pm",
    },
    {
      name: "Karandeep Singh Sandhu",
      age: 19,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      medical_history: "NA",
      symptoms: ["Cough", "Fever"],
      date: "23-10-2023",
      time: "10:15pm",
    },
    {
      name: "Aditya Rai",
      age: 32,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      medical_history: "NA",
      symptoms: ["Fever"],
      date: "23-10-2023",
      time: "10:15pm",
    },
    {
      name: "Karandeep Singh Sandhu",
      age: 19,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      medical_history: "NA",
      symptoms: ["Cough", "Fever"],
      date: "23-10-2023",
      time: "10:15pm",
    },
    {
      name: "Aditya Rai",
      age: 32,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      medical_history: "NA",
      symptoms: ["Fever"],
      date: "23-10-2023",
      time: "10:15pm",
    },
  ];

  const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      marginTop: 15,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 25,
    },
    textContainer: {
      marginLeft: 30,
    },
    labelText: {
      fontWeight: "bold",
    },
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("PatientDetails", { patient: item })}
    >
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ ...styles.labelText, fontSize: 16, width: "100%" }}
        >
          {item.name}
        </Text>
        <Text style={{ ...styles.labelText, marginTop: 10 }}>
          Date: {item.date}
        </Text>
        <Text style={styles.labelText}>Time: {item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, marginTop: 10, height: 800 }}>
      <FlatList
        data={patientData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TomorrowsPatient;
