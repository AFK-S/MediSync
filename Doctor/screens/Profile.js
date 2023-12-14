import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import StateContext from "../context/StateContext";
import axios from "axios";
import Timeline from "react-native-timeline-flatlist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const { setIsLogin } = useContext(StateContext);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("_id");
      setIsLogin(false);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error removing login status:", error);
    }
  };
  const patient = {
    name: "Dr. Karandeep Singh Sandhu",
    age: 19,
    image:
      "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    medical_history: "NA",
    symptoms: ["Cough", "Fever"],
    date: "23-10-2023",
    time: "10:15pm",
  };

  const [timeline, setTimeline] = useState([
    {
      time: "12/01/20",
      title: "Hospital ABC",
      description: "2:30PM - 02:30PM",
    },
    {
      time: "12/01/20",
      title: "Hospital ABC",
      description: "2:30PM - 02:30PM",
    },
    {
      time: "12/01/20",
      title: "Hospital ABC",
      description: "2:30PM - 02:30PM",
    },
    {
      time: "12/01/20",
      title: "Hospital ABC",
      description: "2:30PM - 02:30PM",
    },
    {
      time: "12/01/20",
      title: "Hospital ABC",
      description: "2:30PM - 02:30PM",
    },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.topContainer}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 20,
          }}
        >
          <Text style={styles.title}>MediSync</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...styles.title, fontSize: 30 }}>Profile</Text>
        </View>
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            maxWidth: "100%",
          }}
        >
          <Image source={{ uri: patient.image }} style={styles.avatar} />
          <Text
            style={{
              fontSize: 30,
              marginStart: 20,
              width: "60%",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            {patient.name}
          </Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{ flex: 1, padding: 20, paddingTop: 0, alignItems: "center" }}
        >
          <View
            style={{
              width: "100%",
              marginTop: 30,
              backgroundColor: "#f2f2f2",
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text style={styles.infoText}>Age: {patient.age}</Text>
            <Text style={styles.infoText}>
              Medical History: {patient.medical_history}
            </Text>
            <Text style={styles.infoText}>
              Symptoms: {patient.symptoms.join(", ")}
            </Text>
            <Text style={styles.infoText}>Date: {patient.date}</Text>
            <Text style={styles.infoText}>Time: {patient.time}</Text>
          </View>
          <View
            style={{
              width: "100%",
              marginTop: 30,
              marginLeft: 20,
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "600", marginBottom: 10 }}>
              Schedule
            </Text>
            <Timeline
              style={{ padding: 20 }}
              data={timeline}
              circleSize={20}
              circleColor="#18C37D"
              lineColor="#18C37D"
              timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
              timeStyle={{
                textAlign: "center",
                backgroundColor: "#18C37D",
                color: "white",
                fontWeight: "600",
                padding: 8,
                borderRadius: 15,
              }}
              descriptionStyle={{ color: "gray" }}
              options={{
                style: { paddingTop: 5 },
              }}
              isUsingFlatlist={true}
              innerCircle={"dot"}
            />
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logout}>
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18 }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoText: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 10,
  },
  title: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
  },

  previousVisitItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  topContainer: {
    backgroundColor: "#18C37D",
    height: 240,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logout: {
    backgroundColor: "#FF3636",
    width: "100%",
    borderRadius: 16,
    padding: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
