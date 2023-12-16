import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import StateContext from "../context/StateContext";

const PatientDetailsScreen = ({ route }) => {
  const { patient } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { getPatientInfo, patientData } = useContext(StateContext);

  const id = (patient.patient && patient.patient._id) || patient._id;

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setModalVisible(false);
    }, 2000);
  };
  useEffect(() => {
    console.log(id);

    getPatientInfo(id);
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: undefined,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const closePreview = () => {
    setModalVisible(false);
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const capitalizeAndReplaceUnderscore = (str) => {
    const withoutUnderscore = str.replace(/_/g, " ");
    return (
      withoutUnderscore.charAt(0).toUpperCase() + withoutUnderscore.slice(1)
    );
  };

  const formataDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const prescription = [
    {
      date: "23/10/2002",
      link: "https://firebasestorage.googleapis.com/v0/b/medisync-e2ef1.appspot.com/o/SIH%20PARTICIPATION%20CONSENT.pdf?alt=media&token=cc38f51b-5830-4372-8047-40d4af93ed93",
    },
  ];

  const renderPreviousVisitItem = ({ item }) => (
    <View style={styles.previousVisitItem}>
      <Text style={{ ...styles.infoText, marginEnd: 20 }}>
        {formataDate(item.date)}
      </Text>
      <Text
        style={{ ...styles.infoText, width: "60%" }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.doctor.name}
      </Text>
    </View>
  );

  const handleLinkPress = (link) => {
    Linking.openURL(link)
      .then((supported) => {
        if (!supported) {
          console.error("Cannot handle URL:", link);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const renderReportsItem = ({ item }) => (
    <View style={styles.previousVisitItem}>
      <View style={{ marginEnd: 20 }}>
        <Text style={{ ...styles.infoText, marginEnd: 20 }}>
          {formataDate(item.createdAt)}
        </Text>

        {item.disease.length > 0 ? (
          <Text
            style={{
              ...styles.infoText,
              marginEnd: 20,
              fontSize: 14,
              color: "grey",
            }}
          >
            {item.disease.join(", ")}
          </Text>
        ) : (
          <Text
            style={{
              ...styles.infoText,
              marginEnd: 20,
              fontSize: 14,
              color: "grey",
            }}
          >
            No disease
          </Text>
        )}
      </View>

      <TouchableOpacity onPress={() => handleLinkPress(item.url)}>
        <Text
          style={{
            ...styles.infoText,
            color: "#18C37D",
            textDecorationLine: "underline",
          }}
        >
          View
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPrescriptionItem = ({ item }) => (
    <View style={styles.previousVisitItem}>
      <View style={{ marginEnd: 20 }}>
        <Text style={{ ...styles.infoText }}>{item.date}</Text>
        <Text style={{ ...styles.infoText, marginEnd: 20 }}>{item.title}</Text>
      </View>
      <TouchableOpacity onPress={() => handleLinkPress(item.link)}>
        <Text
          style={{
            ...styles.infoText,
            color: "#18C37D",
            textDecorationLine: "underline",
          }}
        >
          View
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            maxWidth: "100%",
          }}
        >
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
            }}
            style={styles.avatar}
          />
          <Text
            style={{
              fontSize: 30,
              marginStart: 20,
              width: "60%",
              fontWeight: "700",
            }}
          >
            {patientData && patientData.name}
          </Text>
        </View>
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
            Age: {patientData && patientData.age} years
          </Text>
          <Text style={styles.infoText}>
            Phone Number: {patientData && patientData.phone_number}
          </Text>
          {patientData && patientData.disease.length > 0 ? (
            <Text style={styles.infoText}>
              Medical History: {patientData.disease.join(", ")}
            </Text>
          ) : (
            <Text style={styles.infoText}>Medical History: None</Text>
          )}

          {patient.symptoms && patient.symptoms.length > 0 ? (
            <Text style={styles.infoText}>
              Symptoms:{" "}
              {patient.symptoms.map(capitalizeAndReplaceUnderscore).join(", ")}
            </Text>
          ) : (
            <Text style={styles.infoText}>Symptoms: None</Text>
          )}

          {patient.date && (
            <Text style={styles.infoText}>
              Date: {formatDate(patient.date)}
            </Text>
          )}

          {patient.time_slot && (
            <Text style={styles.infoText}>Time Slot: {patient.time_slot}</Text>
          )}

          {patient.time && (
            <Text style={styles.infoText}>Time: {patient.time}</Text>
          )}
        </View>

        <View style={{ width: "100%", marginTop: 40 }}>
          <Text style={styles.title}>Previous Visits</Text>
          <View
            style={{
              backgroundColor: "#f2f2f2",
              padding: 20,
              paddingVertical: 10,
              borderRadius: 20,
            }}
          >
            <View style={{ ...styles.previousVisitItem, marginBottom: 10 }}>
              <Text style={styles.titleText}>Date</Text>
              <Text style={styles.titleText}>Treated By</Text>
            </View>

            <ScrollView
              style={{ maxHeight: 400 }}
              showsVerticalScrollIndicator={false}
            >
              <FlatList
                data={patientData && patientData.past_visit}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderPreviousVisitItem}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          </View>
        </View>

        <View style={{ width: "100%", marginTop: 40 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>Reports</Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              {!selectedImage ? (
                <TouchableOpacity onPress={pickImage} style={styles.AddButton}>
                  <Text
                    style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}
                  >
                    Add
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedImage(null);
                    setModalVisible(false);
                  }}
                  style={styles.AddButton}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}
                  >
                    Upload
                  </Text>
                </TouchableOpacity>
              )}
              {selectedImage && (
                <View style={{ marginRight: 20 }}>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image
                      source={{ uri: selectedImage }}
                      style={{ width: 50, height: 50, borderRadius: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {/* Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closePreview}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                  <TouchableOpacity
                    onPress={closePreview}
                    style={styles.closeButton}
                  >
                    <Text
                      style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}
                    >
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View
            style={{
              backgroundColor: "#f2f2f2",
              padding: 20,
              paddingVertical: 10,
              borderRadius: 20,
            }}
          >
            <View style={{ ...styles.previousVisitItem, marginBottom: 10 }}>
              <Text style={styles.titleText}>Date</Text>
              <Text style={styles.titleText}>View</Text>
            </View>

            <ScrollView
              style={{ maxHeight: 400 }}
              showsVerticalScrollIndicator={false}
            >
              <FlatList
                data={patientData && patientData.reports}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderReportsItem}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          </View>
        </View>

        <View style={{ width: "100%", marginTop: 40 }}>
          <Text style={styles.title}>Prescription</Text>
          <View
            style={{
              backgroundColor: "#f2f2f2",
              padding: 20,
              paddingVertical: 10,
              borderRadius: 20,
            }}
          >
            <View style={{ ...styles.previousVisitItem, marginBottom: 10 }}>
              <Text style={styles.titleText}>Date</Text>
              <Text style={styles.titleText}>View</Text>
            </View>

            <ScrollView
              style={{ maxHeight: 400 }}
              showsVerticalScrollIndicator={false}
            >
              <FlatList
                data={prescription}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderPrescriptionItem}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PatientDetailsScreen;

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
    fontSize: 24,
    fontWeight: "700",
    color: "#18C37D",
    marginVertical: 20,
  },
  titleText: {
    fontWeight: "700",
    fontSize: 16,
  },
  previousVisitItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  AddButton: {
    backgroundColor: "#18C37D",
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "80%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
});
