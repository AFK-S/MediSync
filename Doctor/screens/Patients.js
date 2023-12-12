import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Patients = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const patientData = [
    {
      name: "Karandeep Singh Sandhu",
      age: 19,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      medical_history: "NA",
      symptoms: ["Cough", "Fever"],
      date: "23-10-2023",
      time: "10:15pm",
    },
    {
      name: "Aditya Rai",
      age: 32,
      image:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      medical_history: "NA",
      symptoms: ["Fever"],
      date: "23-10-2023",
      time: "10:15pm",
    },
  ];

  const handleFocus = () => {
    setSearchFocused(true);
  };

  const handleBlur = () => {
    setSearchFocused(false);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredPatients = patientData.filter((patient) =>
      patient.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredPatients);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("PatientDetails", { patient: item })}
    >
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ ...styles.labelText, fontSize: 16, width: "100%" }}
        >
          {item.name}
        </Text>
        <Text style={{ ...styles.labelText, marginTop: 10 }}>
          Date: {item.date}
        </Text>
        <Text style={styles.labelText}>Time: {item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
            <Text style={{ ...styles.title, fontSize: 40 }}>Patients</Text>
          </View>
          <TextInput
            style={[
              styles.searchInput,
              isSearchFocused && styles.focusedSearchInput,
            ]}
            placeholder="Search patients..."
            value={searchQuery}
            onChangeText={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </View>
      </View>

      <ScrollView style={{ padding: 20 }}>
        <View style={{ height: "100%" }}>
          <FlatList
            data={searchQuery ? filteredData : patientData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: "#18C37D",
    height: 210,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
  },
  searchInput: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
    borderRadius: 60,
    fontWeight: "600",
    fontSize: 17,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "transparent",
  },
  focusedSearchInput: {
    borderColor: "#000",
  },
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
});

export default Patients;
