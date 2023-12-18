import React, { useState, useContext, useEffect } from "react";
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
  const { setIsLogin, doctorData } = useContext(StateContext);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("_id");
      setIsLogin(false);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error removing login status:", error);
    }
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    // Extract day, month, and year components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Note: Month is zero-based
    const year = date.getFullYear();

    // Ensure two-digit format for day and month
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Construct the formatted date string
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    // Get the day of the week
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];

    return {
      dayOfMonth: day,
      dayOfWeek: dayOfWeek,
      formattedDate: formattedDate,
    };
  }

  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    setTimeline(
      doctorData &&
        doctorData.availability.map((e) => {
          const formatted = formatDate(e.date);
          return {
            time: `${formatted.formattedDate}`,
            description: `${e.start_time} - ${e.end_time}`,
            title: `${formatted.dayOfWeek}`,
          };
        })
    );
  }, [doctorData]);

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
          <Image
            source={{ uri: doctorData && doctorData.photo_url }}
            style={styles.avatar}
          />
          <Text
            style={{
              fontSize: 30,
              marginStart: 20,
              width: "60%",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            {doctorData && doctorData.name}
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
            <Text style={styles.infoText}>
              Age: {doctorData && doctorData.age}
            </Text>
            <Text style={styles.infoText}>
              Gender: {doctorData && doctorData.gender}
            </Text>
            <Text style={styles.infoText}>
              Specailization: {doctorData && doctorData.specialization}
            </Text>
            <Text style={styles.infoText}>
              Experience: {doctorData && doctorData.experience} years
            </Text>
            <Text style={styles.infoText}>
              Phone Number: {doctorData && doctorData.phone_number}
            </Text>
            <Text style={styles.infoText}>
              License Number: {doctorData && doctorData.license_number}
            </Text>
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
              style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}
              data={timeline}
              circleSize={20}
              circleColor="#18C37D"
              lineColor="#18C37D"
              timeContainerStyle={{
                minWidth: 52,
                marginTop: -5,
                marginBottom: 40,
              }}
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
    textTransform: "capitalize",
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
