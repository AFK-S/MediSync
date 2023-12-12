import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Linking } from "react-native";

const PatientDetailsScreen = ({ route }) => {
  const { patient } = route.params;

  const prevVisits = [
    {
      date: "23/10/2023",
      description:
        "JNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjn",
    },
    {
      date: "23/10/2023",
      description:
        "JNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjn",
    },
    {
      date: "23/10/2023",
      description:
        "JNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjn",
    },
    {
      date: "23/10/2023",
      description:
        "JNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjnJNjnciskjn",
    },
  ];

  const reports = [
    {
      date: "23/10/2002",
      title: "XYZ Report",
      link: "https://firebasestorage.googleapis.com/v0/b/medisync-e2ef1.appspot.com/o/SIH%20PARTICIPATION%20CONSENT.pdf?alt=media&token=cc38f51b-5830-4372-8047-40d4af93ed93",
    },
  ];

  const prescription = [
    {
      date: "23/10/2002",
      link: "https://firebasestorage.googleapis.com/v0/b/medisync-e2ef1.appspot.com/o/SIH%20PARTICIPATION%20CONSENT.pdf?alt=media&token=cc38f51b-5830-4372-8047-40d4af93ed93",
    },
  ];

  const renderPreviousVisitItem = ({ item }) => (
    <View style={styles.previousVisitItem}>
      <Text style={{ ...styles.infoText, marginEnd: 20 }}>{item.date}</Text>
      <Text style={styles.infoText}>{item.description}</Text>
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
        <Text style={{ ...styles.infoText, fontSize: 12 }}>{item.date}</Text>
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
          View Report
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
          <Image source={{ uri: patient.image }} style={styles.avatar} />
          <Text
            style={{
              fontSize: 30,
              marginStart: 20,
              width: "60%",
              fontWeight: "700",
            }}
          >
            {patient.name}
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
              <Text style={styles.titleText}>Description</Text>
            </View>

            <ScrollView
              style={{ maxHeight: 400 }}
              showsVerticalScrollIndicator={false}
            >
              <FlatList
                data={prevVisits}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderPreviousVisitItem}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          </View>
        </View>

        <View style={{ width: "100%", marginTop: 40 }}>
          <Text style={styles.title}>Reports</Text>
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
                data={reports}
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
});
