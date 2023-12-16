import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import AppointmentTabs from "../components/AppointmentTabs";
import { useNavigation } from "@react-navigation/native";
import StateContext from "../context/StateContext";

const AppointmentsScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { doctorData, markAttended, getProfile } = useContext(StateContext);
  const navigation = useNavigation();

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const upcomingAppointments =
      doctorData &&
      doctorData.today_appointment.filter(
        (appointment) => !appointment.treated
      );
    setUpcomingAppointments(upcomingAppointments);
  }, [doctorData]);

  const getTitleAndFirstName = (fullName) => {
    if (!fullName) {
      return ""; // Handle the case where fullName is undefined or null
    }

    const title = fullName.split(" ")[0].trim(); // Assuming that the title ends with a dot
    const firstName = fullName.split(" ")[1];

    // Return the formatted string
    return `${title} ${firstName}`;
  };

  const openBottomSheet = (patient) => {
    setSelectedPatient(patient);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const capitalizeAndReplaceUnderscore = (str) => {
    const withoutUnderscore = str.replace(/_/g, " ");
    return (
      withoutUnderscore.charAt(0).toUpperCase() + withoutUnderscore.slice(1)
    );
  };

  const renderBottomSheetContent = () => (
    <View style={styles.bottomSheetContent}>
      <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
        <View
          style={{ padding: 5, backgroundColor: "#f2f2f2", borderRadius: 10 }}
        >
          <Ionicons name="close" size={20} color="black" />
        </View>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 20,
          display: "flex",
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
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
        <View
          style={{
            width: "100%",
            display: "flex",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            {selectedPatient?.patient.name}
          </Text>
        </View>

        <View
          style={{
            marginTop: 25,
            width: "100%",
            backgroundColor: "#f2f2f2",
            padding: 10,
            paddingHorizontal: 15,
            borderRadius: 15,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 5 }}>
            Age: {selectedPatient?.patient.age}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 5 }}>
            Medical History:{" "}
            {selectedPatient?.medical_history?.length
              ? selectedPatient.medical_history
              : "None"}
          </Text>

          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 5 }}>
            Symptoms:{" "}
            {selectedPatient?.symptoms?.length ? (
              selectedPatient.symptoms.map((symptom, index) => (
                <Text key={index}>
                  {capitalizeAndReplaceUnderscore(symptom)}
                  {index !== selectedPatient.symptoms.length - 1 ? ", " : ""}
                </Text>
              ))
            ) : (
              <Text>None</Text>
            )}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 5 }}>
            Date: {formatDate(selectedPatient?.date)}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 5 }}>
            Time: {selectedPatient?.time_slot}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            markAttended(selectedPatient._id);
            toggleModal();
          }}
          style={{
            backgroundColor: "#18C37D",
            padding: 14,
            borderRadius: 10,
            marginTop: 40,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Mark as Attended
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toggleModal();
            navigation.navigate("PatientDetails", { patient: selectedPatient });
          }}
          style={{
            backgroundColor: "#fff",
            borderWidth: 2,
            borderColor: "#18C37D",
            padding: 14,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "#18C37D",
              fontWeight: "600",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            View Full Info{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.topContainer}>
        <View style={styles.innerContainer}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text style={styles.title}>MediSync</Text>
            <Ionicons
              name="search"
              size={20}
              color="white"
              onPress={() => navigation.navigate("Patients")}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...styles.title, fontSize: 30 }}>
              Hi, {doctorData && getTitleAndFirstName(doctorData.name)}
            </Text>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              marginHorizontal: 20,
              fontSize: 16,
            }}
          >
            Upcoming Appointments{" "}
            {`(${upcomingAppointments && upcomingAppointments.length})`}
          </Text>

          {upcomingAppointments && upcomingAppointments.length > 0 ? (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{ padding: 10 }}
            >
              {upcomingAppointments.map((patient, index) => (
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
                        {patient.patient.name}
                      </Text>
                      <View style={{ marginTop: 10 }}>
                        <Text style={styles.silent}>
                          Age : {patient.patient.age}
                        </Text>
                        <Text style={{ ...styles.silent, marginTop: 5 }}>
                          Time : {patient.time_slot}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                ...styles.patientCard,
                marginTop: 20,
                paddingVertical: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                No Appointments Today
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={{ marginTop: 60, padding: 20 }}>
        <View style={{ height: "78%" }}>
          <AppointmentTabs />
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
    height: 210,
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
    width: 55,
    height: 55,
    borderRadius: 25,
  },
  silent: {
    color: "#6d6d6d",
    fontSize: 12,
    fontWeight: "600",
  },
  bottomSheetContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
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
