import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const PatientDetailsScreen = ({ route }) => {
  const { patient } = route.params;

  const styles = StyleSheet.create({
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={{ uri: patient.image }} style={styles.avatar} />
      <Text>Name: {patient.name}</Text>
      <Text>Age: {patient.age}</Text>
      <Text>Medical History: {patient.medical_history}</Text>
      <Text>Symptoms: {patient.symptoms.join(", ")}</Text>
      <Text>Date: {patient.date}</Text>
      <Text>Time: {patient.time}</Text>
    </View>
  );
};

export default PatientDetailsScreen;
