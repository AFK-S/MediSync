import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";

const AppointmentsScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    {
      name: "Karandeep Singh bchbxiljcndc",
      age: 19,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      medical_history: "NA",
      symptoms: ["Cough", "Fever"],
      date: "23-10-2023",
      time: "10:15pm",
    },
    {
      name: "Karandeep Singh bchbxiljcndc",
      age: 19,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      medical_history: "NA",
      symptoms: ["Cough", "Fever"],
      date: "23-10-2023",
      time: "10:15pm",
    },
    {
      name: "Karandeep Singh bchbxiljcndc",
      age: 19,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      medical_history: "NA",
      symptoms: ["Cough", "Fever"],
      date: "23-10-2023",
      time: "10:15pm",
    },
    {
      name: "Karandeep Singh bchbxiljcndc",
      age: 19,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      medical_history: "NA",
      symptoms: ["Cough", "Fever"],
      date: "23-10-2023",
      time: "10:15pm",
    },
  ];

  const openBottomSheet = (patient) => {
    setSelectedPatient(patient);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderBottomSheetContent = () => (
    <View style={styles.bottomSheetContent}>
      <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 20,
          display: "flex",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
            }}
            style={{
              ...styles.avatar,
              marginBottom: 20,
              width: 100,
              height: 100,
            }}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text
            style={{ fontSize: 20, fontWeight: "600", textAlign: "center" }}
          >
            {selectedPatient?.name}
          </Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 5 }}>
            Age: {selectedPatient?.age}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 5 }}>
            Medical History: {selectedPatient?.medical_history}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 5 }}>
            Symptoms:{" "}
            {selectedPatient?.symptoms.map((symptom, index) => (
              <Text key={index}>
                {symptom}
                {index !== selectedPatient.symptoms.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 5 }}>
            Date: {selectedPatient?.date}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 5 }}>
            Time: {selectedPatient?.time}
          </Text>
        </View>
      </View>
    </View>
  );

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
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{ padding: 10 }}
          >
            {patients &&
              patients.map((patient, index) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  key={index}
                  onPress={() => openBottomSheet(patient)}
                >
                  <View style={styles.patientCard}>
                    <View>
                      <Image
                        source={{
                          uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
                        }}
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
                        <Text style={styles.silent}>Age : 30</Text>
                        <Text style={styles.silent}>Monday, 01:00 PM</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        {renderBottomSheetContent()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "#18C37D",
    height: 220,
    borderBottomLeftRadius: 60,
    // borderBottomRightRadius: 60,
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
    width: 55,
    height: 55,
    borderRadius: 25,
  },
  silent: {
    color: "#6d6d6d",
    fontSize: 12,
    fontWeight: "500",
  },
  bottomSheetContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default AppointmentsScreen;
