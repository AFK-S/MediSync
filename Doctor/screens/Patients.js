import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import StateContext from "../context/StateContext";

const Patients = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const { doctorData } = useContext(StateContext);

  const handleFocus = () => {
    setSearchFocused(true);
  };

  const handleBlur = () => {
    setSearchFocused(false);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredPatients = doctorData.treated_patient.filter((patient) =>
      patient.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredPatients);
  };

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
          {item.name}
        </Text>
        <Text style={{ ...styles.labelText, marginTop: 10 }}>
          Age: {item.age}
        </Text>
        {/* <Text style={{ ...styles.labelText, marginTop: 6 }}>
          Time: {itemtime}
        </Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.topContainer,
          { height: Platform.OS === "ios" ? 200 : 220 },
        ]}
      >
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
          {searchQuery ? (
            filteredData.length > 0 ? (
              <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  marginTop: 80,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>No results found</Text>
              </View>
            )
          ) : doctorData.treated_patient &&
            doctorData.treated_patient.length > 0 ? (
            <FlatList
              data={doctorData.treated_patient}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View
              style={{
                flex: 1,
                marginTop: 80,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No patients treated</Text>
            </View>
          )}
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
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
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
    padding: 15,
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
