import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

const TodaysCompletedPatient = ({ route }) => {
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
      age: 19,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      medical_history: "NA",
      symptoms: ["Cough", "Fever"],
      date: "23-10-2023",
      time: "10:15pm",
    },
  ];

  // Common styles for the card
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

  // Render each patient item
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ ...styles.labelText, fontSize: 16, width: "100%" }}
        >
          {item.name}
        </Text>

        {/* <Text style={{ ...styles.labelText, marginTop: 10 }}>
          Age: {item.age}
        </Text> */}
        {/* <Text style={styles.labelText}>
          Medical History: {item.medical_history}
        </Text>
        <Text style={styles.labelText}>
          Symptoms: {item.symptoms.join(", ")}
        </Text> */}
        <Text style={{ ...styles.labelText, marginTop: 10 }}>
          Date: {item.date}
        </Text>
        <Text style={styles.labelText}>Time: {item.time}</Text>
      </View>
    </View>
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

export default TodaysCompletedPatient;
