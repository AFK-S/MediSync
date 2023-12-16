import React, { useContext } from "react";
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
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons

const AVATAR_URL =
  "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png";

const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getFullYear().toString();
  return `${day}-${month}-${year}`;
};

const capitalizeAndReplaceUnderscore = (str) => {
  const withoutUnderscore = str.replace(/_/g, " ");
  return withoutUnderscore.charAt(0).toUpperCase() + withoutUnderscore.slice(1);
};

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
  markNotAttendedButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 8,
  },
});

const TodaysCompletedPatient = () => {
  const navigation = useNavigation();
  const { doctorData, markAttended } = useContext(StateContext);

  // Filter treated appointments
  const treatedAppointments =
    doctorData &&
    doctorData.today_appointment &&
    doctorData.today_appointment.length > 0
      ? doctorData.today_appointment.filter(
          (appointment) => appointment.treated
        )
      : [];

  const renderMarkNotAttendedButton = (id) => (
    <TouchableOpacity
      style={styles.markNotAttendedButton}
      onPress={() => {
        markAttended(id);
      }}
    >
      <Ionicons name="arrow-undo" size={20} color="black" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const { patient, date, time_slot } = item;

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("PatientDetails", { patient: item })}
      >
        <Image source={{ uri: AVATAR_URL }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ ...styles.labelText, fontSize: 16, width: "100%" }}
          >
            {patient.name}
          </Text>
          <Text style={{ ...styles.labelText, marginTop: 10 }}>
            Date: {formatDate(date)}
          </Text>
          <Text style={styles.labelText}>Time: {time_slot}</Text>
        </View>
        {renderMarkNotAttendedButton({ id: item._id })}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, marginTop: 10, height: 800 }}>
      {treatedAppointments.length > 0 ? (
        <FlatList
          data={treatedAppointments}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          extraData={treatedAppointments}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No treated appointments today</Text>
        </View>
      )}
    </View>
  );
};

export default TodaysCompletedPatient;
