import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";

const AppointmentsScreen = () => {
  const patients = [
    {
      name: "Karandeep Singh bchbxiljcndc",
    },
    {
      name: "Aditya Rai",
    },
    {
      name: "Sarthak Deshmukh",
    },
  ];

  return (
    <View>
      <View style={styles.topContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>MediSync</Text>
          <View
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>Hi, Dr. Karandeep</Text>
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              ABC Hospital
            </Text>
          </View>
        </View>
        <View style={{ marginVertical: 30 }}>
          <Text
            style={{ color: "#fff", fontWeight: "700", marginHorizontal: 20 }}
          >
            Upcoming Appointments
          </Text>
          <View style={{ marginTop: 6 }}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{ padding: 10 }}
            >
              {patients &&
                patients.map((patient, index) => (
                  <View style={styles.patientCard} key={index}>
                    <View>
                      <Image
                        source={{
                          uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
                        }} // Replace with the actual URL
                        style={styles.avatar}
                      />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                      <Text
                        style={{ fontWeight: "600", width: 130 }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {patient.name}
                      </Text>

                      <View style={{ marginTop: 10 }}>
                        <Text style={{ ...styles.silent }}>Age : 30</Text>
                        <Text style={{ ...styles.silent }}>
                          Monday, 01:00 PM
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "#18C37D",
    height: 220,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
  },
  patientCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    width: 55, // Adjust the width and height as needed
    height: 55,
    borderRadius: 25, // To make it a circle, set borderRadius to half of the width/height
  },
  silent: {
    color: "#6d6d6d",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default AppointmentsScreen;
