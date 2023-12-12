import { View, Text } from "react-native";
import React from "react";

const TomorrowsPatient = ({ route }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{route.name} Screen Content</Text>
    </View>
  );
};

export default TomorrowsPatient;
