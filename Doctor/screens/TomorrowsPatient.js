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
  const nextDay = doctorData && doctorData.next_date_appointment;

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear().toString();
    return `${day}-${month}-${year}`;
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
    noAppointmentsText: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("PatientDetails", { patient: item })}
    >
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
        }}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ ...styles.labelText, fontSize: 16, width: "100%" }}
        >
          {item.patient.name}
        </Text>
        <Text style={{ ...styles.labelText, marginTop: 10 }}>
          Date: {formatDate(item.date)}
        </Text>
        <Text style={styles.labelText}>Time: {item.time_slot}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, marginTop: 10, height: 800 }}>
      {nextDay && nextDay.length > 0 ? (
        <FlatList
          data={nextDay}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No appointments book yet!</Text>
        </View>
      )}
    </View>
  );
};

export default TomorrowsPatient;
